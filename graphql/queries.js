/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getActivity = /* GraphQL */ `
  query GetActivity($id: ID!) {
    getActivity(id: $id) {
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
export const listActivitys = /* GraphQL */ `
  query ListActivitys(
    $filter: ModelActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getTrip = /* GraphQL */ `
  query GetTrip($id: ID!) {
    getTrip(id: $id) {
      id
      userID
      date
      booked {
        items {
          post{
            title
            image
            startTime
            endTime
            hours
            newPrice
            activity_n
            lineUserID
          }
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
export const listTrips = /* GraphQL */ `
  query ListTrips(
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        date
        booked {
          items{
            post{
              id
              title
              image
              startTime
              endTime
              hours
              newPrice
              activity_n
              latitude
              longitude
            }
            isDone
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
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getBooked = /* GraphQL */ `
  query GetBooked($id: ID!) {
    getBooked(id: $id) {
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
export const listBookeds = /* GraphQL */ `
  query ListBookeds(
    $filter: ModelBookedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookeds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getExperience = /* GraphQL */ `
  query GetExperience($id: ID!) {
    getExperience(id: $id) {
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
export const listExperiences = /* GraphQL */ `
  query ListExperiences(
    $filter: ModelExperienceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExperiences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        contentUri
        description
        userID
        user {
          id
          username
          email
          imageUri
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
      nextToken
    }
  }
`;
