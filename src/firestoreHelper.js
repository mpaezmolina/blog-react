const firestoreApiURL = "https://firestore.googleapis.com/v1/",
    firestoreProjectURL = 'projects/blog-8e606/databases/(default)/documents',
    firestoreURL = firestoreApiURL + firestoreProjectURL,
    postCollectionStr = 'posts',
    runQuery = 'runQuery';

export async function listPosts() {

    const response = await fetch(firestoreURL + "/" + postCollectionStr);
    if (response.ok) {
        const posts = await response.json();

        var finalPosts = [];
        if (posts && Object.keys(posts).length > 0) {
            posts.documents.forEach(aPost => {
                finalPosts.push(postParser(aPost));
            });
        }
        return finalPosts;
    }
}

export function postByTitle(title) {
    const url = firestoreURL + ':' + runQuery;

    var query = {
        structuredQuery: {
            where: {
                fieldFilter: {
                    field: { fieldPath: "title" },
                    op: "EQUAL",
                    value: { stringValue: title }
                }
            },
            from: [{ collectionId: postCollectionStr }]
        }
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((data) => {
        return postParser(data[0].document);
    })
}

export function postById(id) {
    const url = firestoreURL + '/' + postCollectionStr + "/" + id;
    return fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            return postParser(data);
        });
}

export function createPostComment(postNameUrl, name, text) {
    const url = firestoreApiURL + postNameUrl + "/comments";

    var comment = {
        fields: {
            name: {
                stringValue: name
            },
            text: {
                stringValue: text
            }
        }
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((comment) => {
        return {
            name: comment.fields.name.stringValue,
            text: comment.fields.text.stringValue,
            date: comment.createTime
        }
    })
}

export function listComments(postNameUrl) {

    return fetch(firestoreApiURL + postNameUrl + "/comments")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((comments) => {

            var finalComments = [];

            if (comments && Object.keys(comments).length > 0) {
                comments.documents.forEach(aComment => {
                    finalComments.push({
                        name: aComment.fields.name.stringValue,
                        text: aComment.fields.text.stringValue,
                        date: aComment.createTime
                    })
                });
            }

            return finalComments;
        });

}

function postParser(rawPost) {
    var post = {
        title: rawPost.fields.title.stringValue,
        date: rawPost.createTime,
        body: rawPost.fields.body.stringValue,
        name: rawPost.name
    };
    return post;
}