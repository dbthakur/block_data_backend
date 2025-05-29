

import { db } from "../../db/dbConnect.js";

export const getBlockDataService = async (date, page = 1, limit = 50) => {
  try {
    const inputDate = new Date(date);
    if (isNaN(inputDate)) throw new Error("Invalid date format");

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const yyyyMM = `${year}-${month}`;

    const fyStart = inputDate.getMonth() + 1 >= 4
      ? `${year}-04-01`
      : `${year - 1}-04-01`;

    const fyEnd = inputDate.getMonth() + 1 >= 4
      ? `${year + 1}-03-31`
      : `${year}-03-31`;

    const offset = (page - 1) * limit;

    const queries = {
      current_date: `SELECT * FROM block_data WHERE \`date\` = ?`,
      month: `SELECT SQL_CALC_FOUND_ROWS * FROM block_data WHERE DATE_FORMAT(\`date\`, '%Y-%m') = ? LIMIT ? OFFSET ?`,
      financialYear: `SELECT SQL_CALC_FOUND_ROWS * FROM block_data WHERE \`date\` BETWEEN ? AND ? LIMIT ? OFFSET ?`
    };

    const [currentDate] = await db.query(queries.current_date, [date]);

    const [monthData] = await db.query(queries.month, [yyyyMM, Number(limit), Number(offset)]);
    const [[{ "FOUND_ROWS()": monthTotal }]] = await db.query("SELECT FOUND_ROWS()");

    const [fyData] = await db.query(queries.financialYear, [fyStart, fyEnd, Number(limit), Number(offset)]);
    const [[{ "FOUND_ROWS()": fyTotal }]] = await db.query("SELECT FOUND_ROWS()");
    
    //grouping financial year data by unique departments
    const uniqueDepartments = [...new Set(fyData.map(item => item.Department))];

    const setData = uniqueDepartments.map((uniqD) => {
      const tempOBJ = fyData.filter((fyDataObj) => fyDataObj.Department === uniqD);
      return {
        DEPARTMENT_NAME: uniqD,
        DATA: [...tempOBJ]
        
      };


    });


const uniqueSections = [...new Set(fyData.map(item => item.section))];


    // Grouping financial year data by unique sections
    const setuniqueSection = uniqueSections.map((uniqS) => {
      const tempOBJC = fyData.filter((fyDataObj) => fyDataObj.section === uniqS);
      return {
        SECTION_NAME:uniqS,DATA: [...tempOBJC] 
      };
    });



    return {
      currentDate: date,
      month: yyyyMM,
      
      monthPagination: {
        page: Number(page),
        limit: Number(limit),
        totalRecords: monthTotal,
        totalPages: Math.ceil(monthTotal / limit)
      },
      financialYearPagination: {
        page: Number(page),
        limit: Number(limit),
        totalRecords: fyTotal,
        totalPages: Math.ceil(fyTotal / limit)
      },    
      currentDate,
      monthData,
      uniqueDepartments: setData,
      uniqueSections: setuniqueSection,
      
    };

  } catch (error) {
    console.error("Error in block data summary service:", error);
    throw error;
  }
};



