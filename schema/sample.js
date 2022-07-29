//SOME SAMPLE MUTATIONS

//GET USER WITH ID
`
query character($id: ID!) {
    character(id: $id) {
      id, 
      name, 
      species, 
      status,
      type, 
      gender,
      created,
      image, 
      origin {
        id
      }, location {
        id
      }, episode {
        id
    }
  }
}

{
    "id": "62e43d715432fabeb1ed27d5"
}
`

//ADD USER
    `
mutation addCharacter(
    $name: String, 
    $status: String, 
    $species: String, 
    $type: String, 
    $gender: String, 
    $created: String, 
    $image: String,
    $origin: ID, 
    $location: ID, 
    $episode: [ID],
  ) {
      addCharacter(
      name: $name, 
        status: $status, 
        species: $species, 
        type: $type, 
        gender: $gender, 
        created: $created, 
        image: $image,
        origin: $origin, 
        location: $location, 
        episode: $episode
    ) {
      id, name, species, status,
      type, gender, created image, 
      origin {
        id
      }, location {
        id
      }, episode {
        id
      }
    }
  }
`

    `
{
    "name": "emmanuel",
    "name": "emmanuel",
    "species": "human",
    "status": "Alive",
    "type": "unkown",
    "gender": "male",
    "created": "January 8th, 2002",
    "image": "https://media.vogue.mx/photos/6293a11fb1d349287c594c29/2:3/w_2560%2Cc_limit/checo-perez-formula-1-gran-premio-de-monaco.jpg",
    "origin": null,
    "location": null,
    "episode": []
  }
`

//ADD LOCATION
`
mutation addLocation(
  $name: String, 
  $dimension: String, 
  $type: String,  
  $created: String,  
  $residents: [ID],
) {
	addLocation(
    name: $name, 
  	dimension: $dimension, 
  	type: $type, 
  	created: $created,
    residents:$residents
  ) {
    id,
    name, 
    type,
    dimension,
    residents {
      id
    },
    created
  }
}

{
  "name": "planet 9",
  "dimension": "human",
  "type": "unknown",
  "created": "unknown",
  "residents": []
}
`

//ADD EPISODE 

`
mutation addEpisode {
  addEpisode(
    name: "Hello world!",
    episode: "S33E1",
    air_date: "December 18, 2032",
    created: "yesterday"
  ) {
    id,
    name, episode
  }
}
`