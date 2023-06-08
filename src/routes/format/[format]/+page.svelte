<script>
   import { goto } from '$app/navigation';
    export let data;
    var format = data.format;
    var inputs = {

    }
    var input = `/gen/${format.id}?input=${
        format.text.map((text) => {
            return text.default || "";
        }).join("|")
    }`;
    async function generate(){
        var url = `/gen/${format.id}?input=`;
        for(var i = 0; i < format.text.length; i++){
          console.log(i, format.text.length)
            url += inputs[i] || "";
            if(i !== format.text.length - 1) url += "|";
        }
        input = url;
    }
</script>

<div class="main">
    <button on:click={() => goto("/")} class="backButton">x</button>
    <h1 class="title">JackSucksAtMemes</h1>
    <h2 class="formatTitle">{format.friendlyName}</h2>
    <img src={`${input}`} alt={format.friendlyName}  class="memeImg" id="result">
    {#each format.text as text, i}
        <input type="text" placeholder="Text" on:input={(e) => {
          console.log(e.target.value, i)
            inputs[i] = e.target.value || "";
            generate();
        }} class="textInput">
    {/each}
    <button on:click={() => {
      var img = document.getElementById("result");
      var link = document.createElement("a");
      link.href = img.src;
      link.download = `${format.friendlyName}.png`;
      link.click();

    }} class="generateButton">Download</button>
    </div>

<style>
    .main{
        background-color: #fff;
        width: 90%;
        height: 90%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        /*align items to center*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        /*border*/
        border-radius: 10px;

    }
    .title{
        font-size: 30px;
        font-family: 'Roboto', sans-serif;
        text-align: center;
        color: #000;
        margin-top: 0px;
        /*change color with animation*/
        animation: blink 5s infinite;
    }
    @keyframes blink{
  0% {
    color: #FE5292; /*JSAL*/
  }
  10% {
    color: #FECC50; /*JSAS*/
  }
  20% {
    color: #4DFF63; /*JSAG*/
  }
  30% {
    color: #4FFEF7; /*JMW*/
  }
  40% {
    color: #624EFF; /*JSAC*/
  }
  50% {
    color: #005BFF; /*No Context*/
  }60% {
    color: #43D5FD; /*GeogStuff*/
  }
  70% {
    color: #DF467C; /*DS*/
  }
  80% {
    /*JSAE (gradient) */
    
    color: linear-gradient(90deg, #7E12FE 0%, #68FF1E 50%, #FFAD0C 100%);
  }
  90% {
    color: #FF9AE8; /*Long channel name*/
  }
  100% {
    color: #EC417B; /*turd boi*/
  }
}

@-webkit-keyframes blink{
  0% {
    color: red;
  }
  20% {
    color: green;
  }
  40% {
    color: yellow;
  }
  60% {
    color: blue;
  }
  80% {
    color: orange;
  }
  100% {
    color: red;
  }
}
    .formats{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;
    }
    .formats img{
        margin: 10px;
        border-radius: 10px;
        transition: 0.5s;
        cursor: pointer;

    }
    .formats img:hover{
        transform: scale(1.1);
    }
    .formatTitle{
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        text-align: center;
        color: #000;
        margin-top: 0px;
    }
    .memeImg{
        margin-top: 10px;
        border-radius: 10px;
        width: 70%;
        height: 70%;
        object-fit: contain;

    }
    .textInput{
        margin-top: 10px;
        border-radius: 10px;
      
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        text-align: center;
        color: #000;
        margin-top: 0px;
        /*center text*/
        text-align: center;
    }
    .generateButton{
        margin-top: 10px;
        border-radius: 10px;
        background-color: #000;
        color: #fff;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        text-align: center;
        padding: 10px;
        cursor: pointer;
        transition: 0.5s;
    }
    .generateButton:hover{
        background-color: #fff;
        color: #000;
    }
    .backButton{
        color: red;
        font-size: 30px;
        font-family: 'Roboto', sans-serif;
        text-align: center;
        padding: 10px;
        cursor: pointer;
        transition: 0.5s;
        position: absolute;
        top: 10px;
        left: 10px;
        border: none;
        background-color: transparent;
        transition: 0.5s;
    }
    .backButton:hover{
        color: #000;
        transform: scale(1.1);
    }
</style>