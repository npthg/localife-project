/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateActivity = /* GraphQL */ `
  subscription OnCreateActivity {
    onCreateActivity {
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
export const onUpdateActivity = /* GraphQL */ `
  subscription OnUpdateActivity {
    onUpdateActivity {
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
export const onDeleteActivity = /* GraphQL */ `
  subscription OnDeleteActivity {
    onDeleteActivity {
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
export const onCreateTrip = /* GraphQL */ `
  subscription OnCreateTrip {
    onCreateTrip {
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
export const onUpdateTrip = /* GraphQL */ `
  subscription OnUpdateTrip {
    onUpdateTrip {
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
export const onDeleteTrip = /* GraphQL */ `
  subscription OnDeleteTrip {
    onDeleteTrip {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateBooked = /* GraphQL */ `
  subscription OnCreateBooked {
    onCreateBooked {
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
export const onUpdateBooked = /* GraphQL */ `
  subscription OnUpdateBooked {
    onUpdateBooked {
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
export const onDeleteBooked = /* GraphQL */ `
  subscription OnDeleteBooked {
    onDeleteBooked {
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
export const onCreateExperience = /* GraphQL */ `
  subscription OnCreateExperience {
    onCreateExperience {
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
export const onUpdateExperience = /* GraphQL */ `
  subscription OnUpdateExperience {
    onUpdateExperience {
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
export const onDeleteExperience = /* GraphQL */ `
  subscription OnDeleteExperience {
    onDeleteExperience {
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
