<script>
   import { goto } from '$app/navigation';
    export let data;
    var formats = data.formats;
</script>

<div class="main">
    <h1 class="title">JackSucksAtMemes</h1>
    <div class="formats">
        {#each formats as format}
           <img src={`/img/${format.id}`} alt={format.friendlyName} width="200" height="200"
              on:click={() => {
                goto(`/format/${format.id}`);
              }}
           >
        {/each}
        </div>
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
</style>