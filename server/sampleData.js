import Face from './models/face';

export default function () {
  Face.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    var faces = [
        new Face({
            name: 'Chelsea Islan', 
            image: 'http://i.imgur.com/u9nr2Tl.jpg'
        }),
        new Face({
            name: 'Joanna Alexandra', 
            image: 'http://i.imgur.com/knyBfZQ.jpg'
        }),
        new Face({
            name: 'Efranda Stefanus', 
            image: 'http://i.imgur.com/DlvavNF.jpg'
        }),
        new Face({
            name: 'Isyana Sarasvati', 
            image: 'http://i.imgur.com/DODjrlf.jpg'
        }),
        new Face({
            name: 'Pamela Bowie', 
            image: 'http://i.imgur.com/WQ9gnvN.jpg'
        }),
        new Face({
            name: 'Pevita Pearce', 
            image: 'http://i.imgur.com/1rlDBtV.jpg'
        }),
        new Face({
            name: 'Raisa Andriana', 
            image: 'http://i.imgur.com/3s6QvAm.jpg'
        }),
        new Face({
            name: 'Raline Shah', 
            image: 'http://i.imgur.com/S4PkiYe.jpg'
        })

        
    ];

    Face.create(faces, (error) => {
      if (!error) {
        console.log('sample data just created.');
      }
    });
  });
}
