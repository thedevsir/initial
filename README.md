# initial
Function for creating svg avatars written in es6

# How to use ?
```
let avatar = document.creatElement('img');
avatar.src = initial({
        // Default settings
        name: 'Name',
        color: null,
        seed: 0,
        charCount: 1,
        textColor: '#ffffff',
        height: 100,
        width: 100,
        fontSize: 60,
        fontWeight: 300,
        fontFamily: 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',
        radius: 0
    });

document.body.appendChild(avatar);    
```