export const groupByLevels = (data, levels, allGroupKeys = null) => {
  // Build allGroupKeys only once
  if (!allGroupKeys) {
    allGroupKeys = levels.flatMap(level =>
      typeof level === 'object' ? [level.key, level.description] : [level]
    );
  }

  if (levels.length === 0) return data;

  const level = levels[0];
  const isObjectLevel = typeof level === 'object';
  const key = isObjectLevel ? level.key : level;
  const descKey = isObjectLevel ? level.description : null;

  const grouped = new Map();

  for (const item of data) {
    const groupKey = item[key];
    if (!grouped.has(groupKey)) grouped.set(groupKey, []);
    grouped.get(groupKey).push(item);
  }

  return Array.from(grouped.entries()).map(([groupKey, items]) => {
    const result = { [key]: groupKey };

    if (descKey) {
      result[descKey] = items[0][descKey];
    }

    const nextLevel = groupByLevels(items, levels.slice(1), allGroupKeys);

    if (levels.length === 1) {
      result.data = nextLevel.map(item => {
        const cleanItem = { ...item };
        allGroupKeys.forEach(key => delete cleanItem[key]);
        return cleanItem;
      });
    } else {
      result.children = nextLevel;
    }

    return result;
  });
};
