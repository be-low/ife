function getURL(URL) {
    return new Promise(((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.setRequestHeader('Accept', 'application/vnd.github.mercy-preview+json');
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText)
            } else {
                reject(req.statusText);
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send();
    }));
}


let request = {
    comment: function getComment() {
        return getURL('https://api.github.com/search/topics?q=cpp').then(JSON.parse);
    },
    people: function getPeople() {
        return getURL('https://api.github.com/search/topics?q=java').then(JSON.parse);
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
// request.comment().then(text => console.log(text));