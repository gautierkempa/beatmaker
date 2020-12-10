class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad'); // permet de prendre tous les carrés de couleur
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
    }
    activePad(){ // permet d'ajouter la classe active sur chaque carré
        this.classList.toggle('active');
    }
    repeat(){
        let step = this.index % 8; // permet de parcourir chaque carré 1 par un et de loop (Le % renvoie le reste entier de la division, à vérifier)
        const activeBars = document.querySelectorAll(`.b${step}`);
       // Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`; // le 2 permet d'avoir une animation smooth
            // vérifier si les pad sont actif
            if(bar.classList.contains("active")){ // check lequel est actif. il les parcours verticalement
                // il faut vérifier quel type de pad et jouer celui qui est actif
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0; // permet de pouvoir enchainer les sons.
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        setInterval(() => { // on utilise une arrow function car si on n'en utilise pas, si on appelle le "this.repeat()", ça ne fonctionnera pas. Car quand on a une fonction à l'intérieur d'une méthode, le "this" fera référence au window. Alors que la fonction flêchée permet de sortir de ça et d'aller rechercher l'autre fonction
            this.repeat();
        }, interval); // 1000 ms
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => { // pour chaque pad, au click on lance la méthode activePad. Le .pads vient du constructor en haut.
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener('click', function(){
    drumKit.start();
});