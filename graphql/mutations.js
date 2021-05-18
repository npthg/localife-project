/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      image
      gallery
      type
      title
      description
      province
      address
      hours
      activity_n
      maxGuests
      activity {
        items {
          id
          postID
          time
          title
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      oldPrice
      newPrice
      latitude
      longitude
      lineUserID
      startTime
      endTime
      createdAt
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      image
      gallery
      type
      title
      description
      province
      address
      hours
      activity_n
      maxGuests
      activity {
        items {
          id
          postID
          time
          title
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      oldPrice
      newPrice
      latitude
      longitude
      lineUserID
      startTime
      endTime
      createdAt
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      image
      gallery
      type
      title
      description
      province
      address
      hours
      activity_n
      maxGuests
      activity {
        items {
          id
          postID
          time
          title
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      oldPrice
      newPrice
      latitude
      longitude
      lineUserID
      startTime
      endTime
      createdAt
      updatedAt
    }
  }
`;
export const createActivity = /* GraphQL */ `
  mutation CreateActivity(
    $input: CreateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    createActivity(input: $input, condition: $condition) {
      id
      postID
      time
      title
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity(
    $input: UpdateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    updateActivity(input: $input, condition: $condition) {
      id
      postID
      time
      title
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity(
    $input: DeleteActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    deleteActivity(input: $input, condition: $condition) {
      id
      postID
      time
      title
      description
      createdAt
      updatedAt
    }
  }
`;
export const createTrip = /* GraphQL */ `
  mutation CreateTrip(
    $input: CreateTripInput!
    $condition: ModelTripConditionInput
  ) {
    createTrip(input: $input, condition: $condition) {
      id
      userID
      date
      booked {
        items {
          id
          userID
          tripID
          postID
          date
          isDone
          createdAt
          updatedAt
        }
        nextToken
      }
      guests
      isDone
      tripStartTime
      tripEndTime
      createdAt
      updatedAt
    }
  }
`;
export const updateTrip = /* GraphQL */ `
  mutation UpdateTrip(
    $input: UpdateTripInput!
    $condition: ModelTripConditionInput
  ) {
    updateTrip(input: $input, condition: $condition) {
      id
      userID
      date
      booked {
        items {
          id
          userID
          tripID
          postID
          date
          isDone
          createdAt
          updatedAt
        }
        nextToken
      }
      guests
      isDone
      tripStartTime
      tripEndTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteTrip = /* GraphQL */ `
  mutation DeleteTrip(
    $input: DeleteTripInput!
    $condition: ModelTripConditionInput
  ) {
    deleteTrip(input: $input, condition: $condition) {
      id
      userID
      date
      booked {
        items {
          id
          userID
          tripID
          postID
          date
          isDone
          createdAt
          updatedAt
        }
        nextToken
      }
      guests
      isDone
      tripStartTime
      tripEndTime
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      imageUri
      exp {
        items {
          id
          contentUri
          description
          userID
          postID
          createdAt
          updatedAt
        }
        nextToken
      }
      book {
        items {
          id
          userID
          tripID
          postID
          date
          isDone
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      imageUri
      exp {
        items {
          id
          contentUri
          description
          userID
          postID
          createdAt
          updatedAt
        }
        nextToken
      }
      book {
        items {
          id
          userID
          tripID
          postID
          date
          isDone
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      imageUri
      exp {
        items {
          id
          contentUri
          description
          userID
          postID
          createdAt
          updatedAt
        }
        nextToken
      }
      book {
        items {
          id
          userID
          tripID
          postID
          date
          isDone
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createBooked = /* GraphQL */ `
  mutation CreateBooked(
    $input: CreateBookedInput!
    $condition: ModelBookedConditionInput
  ) {
    createBooked(input: $input, condition: $condition) {
      id
      userID
      tripID
      postID
      post {
        id
        image
        gallery
        type
        title
        description
        province
        address
        hours
        activity_n
        maxGuests
        activity {
          nextToken
        }
        oldPrice
        newPrice
        latitude
        longitude
        lineUserID
        startTime
        endTime
        createdAt
        updatedAt
      }
      date
      isDone
      createdAt
      updatedAt
    }
  }
`;
export const updateBooked = /* GraphQL */ `
  mutation UpdateBooked(
    $input: UpdateBookedInput!
    $condition: ModelBookedConditionInput
  ) {
    updateBooked(input: $input, condition: $condition) {
      id
      userID
      tripID
      postID
      post {
        id
        image
        gallery
        type
        title
        description
        province
        address
        hours
        activity_n
        maxGuests
        activity {
          nextToken
        }
        oldPrice
        newPrice
        latitude
        longitude
        lineUserID
        startTime
        endTime
        createdAt
        updatedAt
      }
      date
      isDone
      createdAt
      updatedAt
    }
  }
`;
export const deleteBooked = /* GraphQL */ `
  mutation DeleteBooked(
    $input: DeleteBookedInput!
    $condition: ModelBookedConditionInput
  ) {
    deleteBooked(input: $input, condition: $condition) {
      id
      userID
      tripID
      postID
      post {
        id
        image
        gallery
        type
        title
        description
        province
        address
        hours
        activity_n
        maxGuests
        activity {
          nextToken
        }
        oldPrice
        newPrice
        latitude
        longitude
        lineUserID
        startTime
        endTime
        createdAt
        updatedAt
      }
      date
      isDone
      createdAt
      updatedAt
    }
  }
`;
export const createExperience = /* GraphQL */ `
  mutation CreateExperience(
    $input: CreateExperienceInput!
    $condition: ModelExperienceConditionInput
  ) {
    createExperience(input: $input, condition: $condition) {
      id
      contentUri
      description
      userID
      user {
        id
        username
        email
        imageUri
        exp {
          nextToken
        }
        book {
          nextToken
        }
        createdAt
        updatedAt
      }
      postID
      post {
        id
        image
        gallery
        type
        title
        description
        province
        address
        hours
        activity_n
        maxGuests
        activity {
          nextToken
        }
        oldPrice
        newPrice
        latitude
        longitude
        lineUserID
        startTime
        endTime
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateExperience = /* GraphQL */ `
  mutation UpdateExperience(
    $input: UpdateExperienceInput!
    $condition: ModelExperienceConditionInput
  ) {
    updateExperience(input: $input, condition: $condition) {
      id
      contentUri
      description
      userID
      user {
        id
        username
        email
        imageUri
        exp {
          nextToken
        }
        book {
          nextToken
        }
        createdAt
        updatedAt
      }
      postID
      post {
        id
        image
        gallery
        type
        title
        description
        province
        address
        hours
        activity_n
        maxGuests
        activity {
          nextToken
        }
        oldPrice
        newPrice
        latitude
        longitude
        lineUserID
        startTime
        endTime
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteExperience = /* GraphQL */ `
  mutation DeleteExperience(
    $input: DeleteExperienceInput!
    $condition: ModelExperienceConditionInput
  ) {
    deleteExperience(input: $input, condition: $condition) {
      id
      contentUri
      description
      userID
      user {
        id
        username
        email
        imageUri
        exp {
          nextToken
        }
        book {
          nextToken
        }
        createdAt
        updatedAt
      }
      postID
      post {
        id
        image
        gallery
        type
        title
        description
        province
        address
        hours
        activity_n
        maxGuests
        activity {
          nextToken
        }
        oldPrice
        newPrice
        latitude
        longitude
        lineUserID
        startTime
        endTime
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
