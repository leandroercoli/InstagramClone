import moment from 'moment'
import { StoryInterface, PostInterface } from '../redux/types'

const userNoah = { id: "7", username: 'noah', avatar: require('../assets/img/noah.jpg') }
const userJonas = { id: "1", username: 'jonaskahnwald', avatar: require('../assets/img/Jonas_Kahnwald.jpg') }
const userBartosz = { id: "2", username: 'bartosztiedemann', avatar: require('../assets/img/bartosz-tiedemann.jpg') }
const userMagnus = { id: "3", username: 'magnusnielsen', avatar: require('../assets/img/magnus.png') }
const userFranziska = { id: "4", username: 'franziskadoppler', avatar: require('../assets/img/Franziska_doppler.png') }
const reginaTiedelmann = { id: "5", username: 'reginatiedelmann', avatar: require('../assets/img/regina-tiedelmann-2.png') }
const ulrichNielsen = { id: "6", username: 'ulrichnielsen', avatar: require('../assets/img/ulrich-nielsen-avatar.jpg') }

const stories: StoryInterface[] = [
    { id: String(moment().unix() + 1), datetime: moment().subtract(2, 'hour'), isSeen: false, isCloseFriend: true, user: userJonas, img: require('../assets/img/41545146_303.jpg') },
    { id: String(moment().unix() + 2), datetime: moment().subtract(4, 'hour'), isSeen: false, isCloseFriend: true, user: userBartosz, img: require('../assets/img/bartosz-jonasjpg.jpg') },
    { id: String(moment().unix() + 3), datetime: moment().subtract(5, 'hour'), isSeen: false, isCloseFriend: false, user: userFranziska, img: require('../assets/img/franziska.jpg') },
    { id: String(moment().unix() + 4), datetime: moment().subtract(6, 'hour'), isSeen: false, isCloseFriend: false, user: userMagnus, img: require('../assets/img/0bf5f974faee6df47d0016053b3c857a.jpg') },
    { id: String(moment().unix() + 5), datetime: moment().subtract(7, 'hour'), isSeen: false, isCloseFriend: false, user: reginaTiedelmann, img: require('../assets/img/regina-tiedelmann.png') },
    { id: String(moment().unix() + 6), datetime: moment().subtract(8, 'hour'), isSeen: false, isCloseFriend: false, user: ulrichNielsen, img: require('../assets/img/ulrich-nielsen2.jpg') },
]

const myStory: StoryInterface[] = [{ id: String(moment().unix()), datetime: moment().subtract(3, 'hour'), isSeen: false, isCloseFriend: false, user: userNoah, interactionsBlocked: true, img: require('../assets/img/noah-tattoo.jpg') }]

const posts: PostInterface[] = [
    {
        id: String(moment().unix() + 1),
        datetime: moment().subtract(1, 'hour'),
        user: userJonas,
        caption: "New season out",
        img: [{ source: require('../assets/img/Jonas_Kahnwald_post.jpg'), aspect: 'landscape' as 'landscape' }, { source: require('../assets/img/jonas-light.jpg'), aspect: 'landscape' as 'landscape' }],
        likes: ["2"],
        comments: [{ user: userBartosz, comment: "so excited for the new season!" }, { user: userFranziska, comment: "can't wait!" }]
    },
    {
        id: String(moment().unix() + 2),
        datetime: moment().subtract(4, 'hour'),
        user: userMagnus,
        caption: "tbt",
        img: [{ source: require('../assets/img/nielsen-family.jpg'), aspect: 'portrait' as 'portrait' }],
        likes: ["2", "3"],
        comments: [{ user: userJonas, comment: "Nice!" }, { user: userFranziska, comment: "Aww!" }]
    },
    {
        id: String(moment().unix() + 3),
        datetime: moment().subtract(8, 'hour'),
        user: userBartosz,
        caption: "bff",
        img: [{ source: require('../assets/img/jonas-bartosz.jpg'), aspect: 'landscape' as 'landscape' }],
        likes: ["2"],
        comments: []
    },
    {
        id: String(moment().unix() + 4),
        datetime: moment().subtract(12, 'hour'),
        user: reginaTiedelmann,
        caption: "gretchen <3",
        img: [{ source: require('../assets/img/regina-tiedelman-dog.jpg'), aspect: 'square' as 'square' }],
        likes: ["2", "3", "4", "5"],
        comments: [{ user: userFranziska, comment: "cute!" }]
    },
    {
        id: String(moment().unix() + 5),
        datetime: moment().subtract(45, 'hour'),
        user: ulrichNielsen,
        caption: "my only aim is to take many lives, the more the better I feel",
        img: [{ source: require('../assets/img/ulrich-nielsen.jpg'), aspect: 'square' as 'square' }],
        likes: ["1", "2"],
        comments: []
    },
    {
        id: String(moment().unix() + 6),
        datetime: moment().subtract(1, 'day'),
        user: userJonas,
        caption: "back to school",
        img: [{ source: require('../assets/img/jonas-school.jpg'), aspect: 'portrait' as 'portrait' }],
        likes: ["1", "2"],
        comments: []
    }
]

export const testData = {
    stories,
    myStory,
    userJonas,
    posts
}