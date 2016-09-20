import Face from './models/face';

export default function () {
  Face.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    var faces = [
        new Face({
            name: 'Raisa Andriana', 
            image: 'https://hello-pet.com/assets/uploads/2016/03/raisa-2.jpg'
        }),
        new Face({
            name: 'Joanna Alexandra', 
            image: 'https://hello-pet.com/assets/uploads/2016/03/raisa-2.jpg'
        }),
        new Face({
            name: 'Franda', 
            image: 'http://3.bp.blogspot.com/-lPi7FgAWQ7Y/Vg7o7o4Tt6I/AAAAAAAABow/lBRz-Xf2WMg/s1600/Franda.jpg'
        }),
        new Face({
            name: 'Pamela Bowie', 
            image: 'http://www.sisidunia.com/wp-content/uploads/2016/07/profil-pamela-bowie-pemeran-kesya-di-ggs-returns-6.jpeg'
        })
    ];

    Face.create(faces, (error) => {
      if (!error) {
        console.log('ready to go....');
      }
    });
  });
}
