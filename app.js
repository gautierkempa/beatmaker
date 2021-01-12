class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad'); // permet de prendre tous les carrés de couleur
        this.playBtn = document.querySelector('.play');
        this.currentKick = './sounds/click-classic.war';
        this.currentSnare = './sounds/snare-acoustic01.war';
        this.currentHihat = './sounds/hihat-acoustic01.war';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;

        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
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
        
        if(this.isPlaying){
            clearInterval(this.isPlaying);
            this.isPlaying = null;  
        }
         else{
            this.isPlaying = setInterval(() => { // on utilise une arrow function car si on n'en utilise pas, si on appelle le "this.repeat()", ça ne fonctionnera pas. Car quand on a une fonction à l'intérieur d'une méthode, le "this" fera référence au window. Alors que la fonction flêchée permet de sortir de ça et d'aller rechercher l'autre fonction
            this.repeat();
           }, interval); // 1000 ms
        }
    }
    updateBtn(){
        console.log(this.isPlaying);
        if(!this.isPlaying){
            this.playBtn.innerText ="Stop";
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = "Play";
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value; // value c'est le nom du son dans le html
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue; // on change le son grâce au nom récupéré avec le e.target.value
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
    mute(e) {
        console.log(e);
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        // si c'est "active" enlève le son
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0; // le .volume = js classique (0 = pas de son; 0.5 = son à moitié; 1 = son à fond)
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else{
            // sinon, si c'est pas active; remet le son
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e){
        const tempoText = document.querySelector('.tempo-nr');
        
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains('acitve')){
            this.start();
        }
    }
}

const drumKit = new DrumKit();

// Event Listener

drumKit.pads.forEach(pad => { // pour chaque pad, au click on lance la méthode activePad. Le .pads vient du constructor en haut.
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener('click', function(){
    drumKit.updateBtn();
    drumKit.start();
    
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    })
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumKit.mute(e);
    })
});

drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
});