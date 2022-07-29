export const timestampToSQLTimestamp = (timestamp: number) => {
    return new Date(timestamp).toISOString().replace("T", " ").slice(0, 19);
};

export const SQLTimestampToTimestamp = (sqlTimestamp: Date) => {
    return sqlTimestamp.getTime();
};
