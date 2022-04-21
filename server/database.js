// db config stuff here later...
import { faker } from '@faker-js/faker';

export const searchSchools = async () => {
    const schools = []
    for (let i = 0; i < 5; i++) {
        const school = {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
        banner: faker.image.abstract(),
        icon: faker.image.abstract(),
        description: faker.lorem.paragraph(),
        }
        schools.push(school)
    }
    return schools;
}

export const createPost = async (post) => {
    return post
}

export const getPostById = async (id) => {
    return {
        id,
        title: faker.commerce.product(),
        text: faker.lorem.paragraph(),
        numLikes: faker.datatype.number(),
        liked: faker.datatype.boolean(),
        createdAt: faker.date.recent()
    }
}

export const updatePost = async (id) => {
    
}

export const likePost = async (id, userId) => {
    
}

export const deletePost = async (id, userId) => {
    
}

export const getComments = async (id) => {
    const comments = []
    for (let i = 0; i < 100; i++) {
      const comment = {
        id: faker.datatype.number(),
        text: faker.lorem.paragraph(),
        postId: id
      }
      comments.push(comment)
    }
    return comments
}

export const createComment = async (comment) => {
    return {
        ...comment,
        id: faker.datatype.number(),
    }
}

export const deleteComment = async (id) => {
    
}

export const getFeed = async (userId) => {
    const posts = []
    for (let i = 0; i < 100; i++) {
      const post = {
        id: faker.datatype.number(),
        title: faker.commerce.product(),
        text: faker.lorem.paragraph(),
        numLikes: faker.datatype.number(),
        liked: faker.datatype.boolean(),
        createdAt: faker.date.recent()
      }
      posts.push(post)
    }
    return posts;
}

export const getRecommendedSchools = async () => {
    return searchSchools()
}

export const getRecommendedTutors = async () => {
    const tutors = []
    for (let i = 0; i < 5; i++) {
      const tutor = {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
      }
      tutors.push(tutor)
    }
    return tutors
}

export const getOngoingMeetings = async () => {
    const meetings = []
    for (let i = 0; i < 5; i++) {
      const meeting = {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
        from: faker.date.recent(),
        to: faker.date.recent()
      }
      meetings.push(meeting)
    }
    return meetings;
}

export const getSchoolById = async (id) => {
    return {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
        banner: faker.image.abstract(),
        icon: faker.image.abstract(),
        description: faker.lorem.paragraph(),
    }
}

export const getSchools = async () => {
    return searchSchools()
}

export const createMeeting = async (meeting) => {
    return {
        id: faker.datatype.number(),
        ...meeting
    }
}

export const deleteMeeting = async (id) => {
   
}


export const updateMeeting = async (meeting) => {
   
}

export const verifyCreds = async (email, password) => {
    return true
}

export const getCollegePosts = async (id) => {
    return getFeed()
}

export const deleteAccount = async (id) => {

}

export const updateProfile = async (profile) => {

}

export const getProfile = async (id) => {
    return {
        id: faker.datatype.number(),
        name: faker.commerce.product(),
        university: faker.commerce.product(),
        gradYear: faker.datatype.number(2030),
        major: faker.commerce.product(),
        aboutMe: faker.lorem.paragraph(),
        resume: faker.image.technics(),
    }
}

export const createAccount = (name, email, password) => {

}