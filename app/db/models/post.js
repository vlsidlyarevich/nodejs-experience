"use strict";

export class Post {
    constructor(id, title, subtitle, content, postDate, updateDate, author) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.postDate = postDate;
        this.updateDate = updateDate;
        this.author = author;
    }
}