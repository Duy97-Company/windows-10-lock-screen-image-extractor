const fs = require('fs');
const createImagesFolder = require('../../../source/helpers/create-images-folder');
const deleteFolderRecursive = require('./../../mock-data/delete-folder-recursive');
const filterUniqueImages = require('../../../source/helpers/filter-unique-images');

describe('Helper - Function filter-unique-images', () => {
  const firstFolder = `${process.cwd()}/tests/old-images`;
  const secondFolder = `${process.cwd()}/tests/mock-assets`;

  beforeEach(() => {
    // Create a new folder that has some duplicated images with mock-assets
    createImagesFolder(firstFolder);
    ['a', 'b' , 'c'].forEach((e, index) => {
      fs.copyFileSync(secondFolder + '/'+ e, firstFolder + '/'+ e);
    })
  });

  it('Should return meta information of uniques images between two folders', () => {
    const oldImages = ['a', 'b' , 'c'].map(name => {
      return {
        name: name,
        path: `${process.cwd()}\\tests\\mock-assets\\`,
      };
    });

    const newImages = ['a', 'b' , 'c', 'd', 'e', 'f'].map(name => {
      return {
        name: name,
        path: `${process.cwd()}\\tests\\mock-assets\\`,
        height: 1080,
        width: 1920,
        type: 'jpg'
      };
    });

    const uniqueImages = filterUniqueImages(newImages, oldImages);

    expect(uniqueImages.length).toEqual(3);
    uniqueImages.forEach((imageObj, index) => {
      // Required properties
      expect(Object.keys(imageObj)).toEqual(["name", "path", "height", "width", "type", "origin", "hash", "date"]);
      // Name equals d -> e -> f
      expect(imageObj.name === String.fromCharCode(100 + index));
    })
  });

  afterEach(() => {
    deleteFolderRecursive(firstFolder);
  })
});
