import Comment from "../../db/models/comment";

function getComments(request, response, next) {
    const handle = (comments, error) => {
        if (error) {
            next(new Error("Bad request/error while obtaining comment with post id: " + request.params.postId));
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(JSON.stringify(comments));
            response.end();
        }
    };

    Comment.getCommentsByPostId(request.params.postId).then(handle);
}

function addComment(request, response, next) {
    const handle = (comment, error) => {
        if (error) {
            next(new Error("Bad request/error while saving comment"));
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(JSON.stringify(comment));
            response.end();
        }
    };

  //TODO add to body postId (request.params.postId)
    Comment.create(request.body).then(handle);
}

function updateComment(request, response, next) {
    const handle = (comment, error) => {
        if (error) {
            next(new Error("Bad request/error while updating comment with id: " + request.params.id));
        }
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write(JSON.stringify(comment));
        response.end();
    };

    Comment.updateById(request.params.id, request.body).then(handle);
}

function deleteComment(request, response, next) {
    const handle = (comment, error) => {
        if (error) {
            next(new Error("Bad request/error while deleting comment with id: " + request.params.id));
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(JSON.stringify(request.params.id));
            response.end();
        }
    };

    Comment.deleteById(request.params.id).then(handle);
}

export {getComments, addComment, deleteComment, updateComment}
