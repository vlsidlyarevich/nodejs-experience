'use strict';

import async from 'async';
import { Post } from './models/post';
import { log } from '../app';

export default function initDb(callback) {

    log.info('Initiating database');

    const post1 = new Post({
        title: 'Man must explore, and this is exploration at its greatest.',
        subtitle: 'Problems look mighty small from 150 miles up.',
        content: '<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>' +
            '<p>Houston, Tranquillity Base here. The Eagle has landed.</p>' +
            '<p>NASA is not about the ‘Adventure of Human Space Exploration’…We won’t be doing it just to get out there in space – we’ll be doing it because the things we learn out there will be making life better for a lot of people who won’t be able to go.</p>' +
            '<p>The Earth was small, light blue, and so touchingly alone, our home that must be defended like a holy relic. The Earth was absolutely round. I believe I never knew what the word round meant until I saw Earth from space.</p>' +
            '<p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. Mankind, let us preserve and increase this beauty, and not destroy it!</p>',
        date: '2016-08-13',
        author: 'vlsidlyarevich'
    });

    const post2 = new Post({
        title: 'I believe every human has a finite number of heartbeats. I don\'t intend to waste any of mine.',
        subtitle: 'Problems look mighty small.',
        content: '<p>NASA is not about the ‘Adventure of Human Space Exploration’…We won’t be doing it just to get out there in space – we’ll be doing it because the things we learn out there will be making life better for a lot of people who won’t be able to go.</p>' +
            '<p>The dreams of yesterday are the hopes of today and the reality of tomorrow.</p>' +
            '<p>As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.</p>',
        date: '2016-08-14',
        author: 'vlsidlyarevich'
    });

    const posts = [post1, post2];

    async.eachSeries(posts, (post, asyncdone) => {
        post.save(asyncdone);
    }, (err) => {
        if (err) return log.error(err);
        callback && callback();
    });
}
