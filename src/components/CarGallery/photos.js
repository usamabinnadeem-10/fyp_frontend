
export const photos = (jsonfile) => {
    const photosList = [];

    for(let photoNum in jsonfile.images){
        photosList.push(
            {
                src:`data:image/jpg;base64,${jsonfile.images[photoNum]}`,
                width: 4,
                height: 3,
                caption: `Rank ${photoNum}`
            }
        )
    }

    return photosList;
};
  