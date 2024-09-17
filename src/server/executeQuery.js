
function executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        promisePool.query(query, params, (err, results) => {
            if (err) {
                console.error(`Error executing query: ${query}`, err);  // Optional logging
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {executeQuery};
