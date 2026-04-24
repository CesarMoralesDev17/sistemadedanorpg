
let gameStarted = false;



//players class
function player (name,hp,maxhp,attacks,type){
    this.name = name;
    this.hp = hp;
    this.maxhp = maxhp;
    this.attacks = attacks;
    this.type = type;
    
}
// creating attacks
function attack(name, damage,type){
    this.name = name;
    this.damage = damage;
}
//initializing attacks
let tackle = new attack("Tackle", 12,"Normal");
let watergun = new attack("Watergun", 18,"Water");
let icyWind = new attack("Icy Wind", 20,"Ice")

let flameThrower = new attack("Flame Thrower",20,"Fire");
let dragonBreath = new attack("Dragon breath",19,"Dragon");
//initializing pokemons

let pokemon1 = new player();
pokemon1 = {
    name: "Squirtle",
    hp: 44,
    maxhp: 44,
    attacks: [tackle,watergun,icyWind],
    type: "water"
}
let pokemon2 = new player();
pokemon2 = {
    name: "Charmander",
    hp: 50,
    maxhp: 50,
    attacks: [tackle,flameThrower,dragonBreath],
    type: "Fire",
    
}
//random number
function randomInt(max){
    let rnd = Math.floor(Math.random() * (max+1));
    return rnd;
}
// Game start
$("body").on("keypress", function(){
    gameStarted = true;
    $("#preGame").addClass("invisible");
    playMusic();
});



function enemyAttack(){
    let chosenEnemyAtk = randomInt(pokemon2.attacks.length-1);
    $(".display").removeClass("invisible");
    pokemon1.hp -= pokemon2.attacks[chosenEnemyAtk].damage;
    $(".squirtleImg").addClass("attacked");
    setTimeout(() => {$(".squirtleImg").removeClass("attacked");}, 300); 
    if(pokemon1.hp<0){pokemon1.hp = 0};
    $(".display").text(`${pokemon1.name} received ${pokemon2.attacks[chosenEnemyAtk].damage}, remaining hp: ${pokemon1.hp}`)
    $("#hpbar1").width((pokemon1.hp/pokemon1.maxhp)*60);    
    setTimeout(function(){$(".display").addClass("invisible");},3000);  
}   


  $(".btn").on('click', function(){
            let userChosenAttack = $(this).attr("id");

            switch(userChosenAttack){
                case "tackle":
                    pokemon2.hp -= tackle.damage;
                    if(pokemon2.hp< 0){pokemon2.hp=0};
                    $(".charmanderImg").addClass("attacked");
                    setTimeout(() => {$(".charmanderImg").removeClass("attacked");}, 300);
                    $(".display").removeClass("invisible");
                    $(".display").text(`${pokemon2.name} received ${tackle.damage} damage remaining hp: ${pokemon2.hp}`);
                    setTimeout(function(){$(".display").addClass("invisible");},3000);                   ;
                    $("#hpbar2").width((pokemon2.hp/pokemon2.maxhp)*60);

                    setTimeout(enemyAttack,3000);                   ;
                    checkIfGameEnds(pokemon1,pokemon2);
                break;
                case "watergun":
                    pokemon2.hp -= watergun.damage;
                    if(pokemon2.hp< 0){pokemon2.hp=0};
                    $(".charmanderImg").addClass("attacked");
                    setTimeout(() => {$(".charmanderImg").removeClass("attacked");}, 300);                    
                    $(".display").removeClass("invisible");
                    $(".display").text(`${pokemon2.name} received ${watergun.damage} damage remaining hp: ${pokemon2.hp}`);
                    setTimeout(function(){$(".display").addClass("invisible");},3000);                   ;
                    $("#hpbar2").width((pokemon2.hp/pokemon2.maxhp)*60);
                    setTimeout(enemyAttack,3000);     
                    checkIfGameEnds(pokemon1,pokemon2);

                break;
                case "icyWind":
                    pokemon2.hp -= icyWind.damage;
                    if(pokemon2.hp< 0){pokemon2.hp=0};
                    $(".charmanderImg").addClass("attacked");
                    setTimeout(() => {$(".charmanderImg").removeClass("attacked");}, 300);                    
                    $(".display").removeClass("invisible");
                    $(".display").text(`${pokemon2.name} received ${icyWind.damage} damage remaining hp: ${pokemon2.hp}`);
                    setTimeout(function(){$(".display").addClass("invisible");},3000);                   ;
                    $("#hpbar2").width((pokemon2.hp/pokemon2.maxhp)*60);
                    setTimeout(enemyAttack,3000);                     
                    checkIfGameEnds(pokemon1,pokemon2);

                break;                   
            }
        });
        
        function checkIfGameEnds(hp1,hp2){
            
    if(hp1.hp <= 0 || hp2.hp <= 0){  
        if(hp1.hp > hp2.hp){
        setTimeout(function(){
        $("#preGame").removeClass("invisible");
        $("#pregame-txt").text(`${hp1.name} wins!`);
        },3000);

        }
        else{
        setTimeout(function(){
        $("#preGame").removeClass("invisible");
        $("#pregame-txt").text(`${hp2.name} wins!`);
        },3000);
        }

        setTimeout(()=>{
            location.reload();},3000);
        }
        }




        
function playMusic(){
    let battleMusic = new Audio('./sound/battle-soundtrack.mp3');
    battleMusic.play();
}

