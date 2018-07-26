function getURL(URL) {
    return new Promise(((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText)
            } else {
                reject(req.statusText);
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        }
    }));
}


let request = {
    comment: function getComment() {
        return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
    },
    people: function getPeople() {
        return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
    }
};

function main() {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }

    let pushValue = recordValue.bind(null, []);
    let tasks = [request.comment, request.people];
    return tasks.reduce((promise, task) => {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());
}

main()
    .then(value => console.log(value))
    .catch(error => console.log(error)
    );