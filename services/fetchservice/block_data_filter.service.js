import { db } from "../../db/dbConnect.js";


export const getBlockData1Service = async (date, filters = {}) => {
  try {
    // Validate input date
    const inputDate = new Date(date);
    if (isNaN(inputDate)) throw new Error("Invalid date format");

    // Extract year and month
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const yyyyMM = `${year}-${month}`;

    // Calculate financial year (April 1 to March 31)
    const fyStart = inputDate.getMonth() + 1 >= 4 ? `${year}-04-01` : `${year - 1}-04-01`;
    const fyEnd = inputDate.getMonth() + 1 >= 4 ? `${year + 1}-03-31` : `${year}-03-31`;

    // Build filter conditions for department and section
    const { department, section } = filters;
    const filterConditions = [];
    const filterParams = [];

    if (department) {
      const deptArray = Array.isArray(department) ? department : [department];
      if (deptArray.length > 0) {
        filterConditions.push(`\`Department\` IN (${deptArray.map(() => "?").join(", ")})`);
        filterParams.push(...deptArray);
      }
    }

    if (section) {
      const sectionArray = Array.isArray(section) ? section : [section];
      if (sectionArray.length > 0) {
        filterConditions.push(`\`section_name\` IN (${sectionArray.map(() => "?").join(", ")})`);
        filterParams.push(...sectionArray);
      }
    }

    const whereClause = filterConditions.length > 0 ? ` AND ${filterConditions.join(" AND ")}` : "";

    // Define SQL queries with dynamic filters
    const queries = {
      currentDate: `SELECT * FROM block_data WHERE \`reportdate\` = ?${whereClause}`,
      currentWeek: `SELECT * FROM block_data WHERE \`reportdate\` >= DATE_SUB(?, INTERVAL 7 DAY) AND \`reportdate\` <= ?${whereClause}`,
      monthData: `SELECT * FROM block_data WHERE DATE_FORMAT(\`reportdate\`, '%Y-%m') = ?${whereClause}`,
      yearData: `SELECT * FROM block_data WHERE YEAR(\`reportdate\`) = ?${whereClause}`,
      fyData: `SELECT * FROM block_data WHERE \`reportdate\` BETWEEN ? AND ?${whereClause}`
    };

    // Execute queries with appropriate parameters
    const [currentDateRows = []] = await db.query(queries.currentDate, [date, ...filterParams]);
    const [currentWeekRows = []] = await db.query(queries.currentWeek, [date, date, ...filterParams]);
    const [monthData = []] = await db.query(queries.monthData, [yyyyMM, ...filterParams]);
    const [yearData = []] = await db.query(queries.yearData, [year, ...filterParams]);
    const [fyData = []] = await db.query(queries.fyData, [fyStart, fyEnd, ...filterParams]);

    // Grouping functions
    const groupByDepartment = (data) =>
      [...new Set(data.map((item) => item.Department))]
        .map((deptt) => ({
          DEPARTMENT_NAME: deptt,
          DATA: data.filter((item) => item.Department === deptt)
        }));

    // const groupBySection = (data) =>
    //   [...new Set(data.map((item) => item.section_name))]
    //     .map((section_name) => ({
    //       SECTION_NAME: section_name,
    //       DATA: data.filter((item) => item.section_name === section_name)
    //     }));

    // const groupByDirection = (data) =>
    //   [...new Set(data.map((item) => item.Direction))]
    //     .map((direction) => ({
    //       LINE_DIRECTION: direction,
    //       DATA: data.filter((item) => item.Direction === direction)
    //     }));

    // Group data for each time period
    const groupData = (rows) => ({
      departments: groupByDepartment(rows),
       sections: groupBySection(rows),
      directions: groupByDirection(rows)
    });

    return {
      currentDate: date,
      month: yyyyMM,
      year: year.toString(),
      financialYear: `${fyStart.split("-")[0]}-${fyEnd.split("-")[0]}`,
      currentDate: groupData(currentDateRows),
      // currentWeek: groupData(currentWeekRows),
      // monthData: groupData(monthData),
      // yearData: groupData(yearData),
      // financialYearData: groupData(fyData)
    };
  } catch (error) {
    console.error("Error in block data summary service:", error.message);
    throw new Error(`Failed to fetch block data: ${error.message}`);
  }
};