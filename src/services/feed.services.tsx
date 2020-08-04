import { testData } from '../extra/testData.extra';
import { PostInterface } from '../redux/types';

export const feedService = {
    updateFeed,
    likePost
};

async function updateFeed(): Promise<PostInterface[]> {
    // return await getFromServer('/api/');
    return testData.posts
}

async function likePost({ postId, userId }: { postId: String, userId: String }): Promise<PostInterface[]> {
    // return await getFromServer('/api/');
    const posts = testData.posts
    posts.map(post => {
        if (post.id == postId) {
            if (post.likes.find(like => like == userId))
                post.likes = post.likes.filter(like => like != userId)
            else post.likes.push(userId)
        }
    })
    return posts
}