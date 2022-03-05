const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading=$('header h2')
const cdThumb=$('.cd-thumb')
const audio=$('#audio')
const cd=$('.cd')
const playBtn=$('.btn-toggle-play')
const player=$('.player')
const progress=$('.progress')
const nextBtn=$('.btn-next') 
const prevBtn=$('.btn-prev')
const randomBtn=$('.btn-random') 
const playList=$('.playlist')

var giam;
const repeatBtn=$('.btn-repeat')
// const indexSong=new Set()
const app={
     isFor:false,
    isSong:false,
    currentIndex:0,
    isRandom:false,
    songs:[
        {
            name: 'anh khac hay em khác',
            singer: 'khắc việt',
            path: './music/Anh-Khac-Hay-Em-Khac-Ngo-DJ-Daniel-Mastro-Remix-Khac-Viet-Daniel-Mastro.mp3',
            image:'./img/th.jpg'
        },
        {
            name: 'Anh nhớ em người yêu cũ ',
            singer: 'Minh vương',
            path: './music/Anh-Nho-Em-Nguoi-Yeu-Cu-Minh-Vuong-M4U.mp3',
            image:'./img/th.jpg'
        },
        {
            name: 'Nen cho hay nên quên',
            singer: 'Phan duy anh',
            path: './music/Nen-Cho-Hay-Nen-Quen-Phan-Duy-Anh.mp3',
            image:'./img/th.jpg'
        },
        {
            name: '3107-2',
            singer: 'DuonggNauWn',
            path: './music/31072LofiVersion-DuonggNauWn-6944268.mp3',
            image:'./img/th.jpg'
        },
        {
            name: 'ChangTraiSoMiHong',
            singer: 'HoangDuyen',
            path: './music/ChangTraiSoMiHongOrinnEDMRemix-HoangDuyen-6977863.mp3',
            image:'./img/th.jpg'
        },
        {
            name: 'DuongTaChoEmVe',
            singer: 'buitruonglinh',
            path: './music/DuongTaChoEmVe-buitruonglinh-6318765.mp3',
            image:'./img/th.jpg'
        },
        {
            name: 'LaDoEmXuiThoi',
            singer: 'KhoiSofiaDanTrangChauDangKhoa',
            path: './music/LaDoEmXuiThoi-KhoiSofiaDanTrangChauDangKhoa-7125647.mp3',
            image:'./img/th.jpg'
        },
        {
            name: 'NguoiEmCoDo',
            singer: 'RumDaa',
            path: './music/NguoiEmCoDo-RumDaa-6914113.mp3',
            image:'./img/th.jpg'
        },
        {
            name: 'SaiGonDauLongQua',
            singer: 'HuaKimTuyenHoangDuyen',
            path: './music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3',
            image:'./img/th.jpg'
        },
        {
            name: '31072LofiVersion',
            singer: 'DuonggNauWn',
            path: './music/31072LofiVersion-DuonggNauWn-6944268.mp3', 
            image:'./img/th.jpg'
        }
        
    ],
    indexSong:new Set(),
    indexSongSet:[],
    render: function(){
          const htmls=this.songs.map(song => {
              return `<div class="song">
              <div class="thumb" style="background-image: url('${song.image}')">
              </div>
              <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </div>
                 `
          })
          playList.innerHTML=htmls.join('\n')
    },
    handleEven:function(){
            const _this=this
             const cdWidth=cd.offsetWidth
           
          const cdThumbanimate=cdThumb.animate([
              {
                  transform:'rotate(360deg)'
              }
          ], {
              duration:10000,
              iterations:Infinity
          })

  
    cdThumbanimate.pause()
        

         document.onscroll=function(){
             const scrollTop=window.scrollY||document.documentElement.scrollTop
            const newCdWidth=cdWidth-scrollTop
            cd.style.width= newCdWidth>0 ? newCdWidth + 'px' : 0
            cd.style.opacity=newCdWidth/cdWidth
         }

         playBtn.onclick=function(){
             if(audio.paused){
                  audio.play()
                  player.classList.add('playing')
               cdThumbanimate.play()
             }
            
             else{
                 audio.pause()
                 player.classList.remove('playing')
                 cdThumbanimate.pause()
             }
         }


         audio.ontimeupdate=function(){
             if(audio.duration)
               progress.value=audio.currentTime/audio.duration*100
       
           
                 
         }



         progress.oninput=function(e){   
           const td=audio.duration/100*e.target.value
            audio.currentTime=td
         }




         nextBtn.onclick=function(){
             if(app.isFor===false){
                let ss=app.currentIndex
                app.nextSong()
             while(ss===app.currentIndex){
                 app.nextSong()
             }
             audio.play()
             player.classList.add('playing')
          cdThumbanimate.play()
             }
           else{
               app.loading()
               audio.play()
               player.classList.add('playing')
            cdThumbanimate.play()
           }
        
         }




         prevBtn.onclick=function(){
             if(app.isFor===false){
                        let ss=app.currentIndex
        app.prevSong()
         while(ss===app.currentIndex){
             app.prevSong()
         }
       audio.play()
         player.classList.add('playing')
      cdThumbanimate.play()
             }else{
                app.loading()
                audio.play()
                player.classList.add('playing')
             cdThumbanimate.play()
             }
     
         }



       audio.onended=function(){
           if(app.isFor===false){
 let ss=app.currentIndex
        app.nextSong()
         while(ss===app.currentIndex){
             app.nextSong()
         }
       audio.play()
         player.classList.add('playing')
      cdThumbanimate.play()
            
           }
           else{
            app.loading()
            audio.play()
            player.classList.add('playing')
         cdThumbanimate.play()
           }
       
       }



       randomBtn.onclick=function(){
           if(app.isRandom){
                app.isRandom=false
           randomBtn.classList.remove('active')
          
           } else{
            app.isRandom=true
            randomBtn.classList.add('active')
           }
          
       }



       repeatBtn.onclick=function(){
           if(app.isFor===false){
               app.isFor=true
               repeatBtn.classList.add('active')
           }
           else{
               app.isFor=false
            repeatBtn.classList.remove('active')
           }
           
       }

      
       playList.onclick=function(){
           const son=$$('.song')
              for(let i=0;i<son.length;i++){
            son[i].onclick=function(){
                app.currentIndex=i;
                app.indexSongSet.push(app.currentIndex)
                for(let i=0;i<app.indexSongSet.length-1;i++){
                    if(app.indexSongSet[app.indexSongSet.length-1]===app.indexSongSet[i]){
                        app.indexSongSet.pop()
                    }
                }
                console.log(app.currentIndex)
                app.loading()
                audio.play()
                player.classList.add('playing')
            cdThumbanimate.play()
            }
       }
     
        }

      
     
     
    },
    
    defineProperties:function(){
             Object.defineProperty(this,'currentSong',{
                 get:()=>{
                     return this.songs[this.currentIndex]
                 }
             })
    },
    loading:function(){
         audio.src=this.currentSong.path
           heading.textContent=this.currentSong.name
           cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
    },
    
    nextSong:function(){
        
   
        if(app.isRandom===false){
              this.currentIndex++;
        if(this.currentIndex>=this.songs.length)
            this.currentIndex=0
           
        } else{
            if(app.indexSongSet.length===app.songs.length){
                app.indexSongSet.splice(0,app.indexSongSet.length)
                app.currentIndex=Math.floor(Math.random()*(app.songs.length))
                app.indexSongSet.unshift(app.currentIndex)
            }else if(app.currentIndex===app.indexSongSet[app.indexSongSet.length-1]||app.indexSongSet.length===0){
           
                app.currentIndex=Math.floor(Math.random()*(app.songs.length))
           
                 app.indexSongSet.push(app.currentIndex)
             for(let i=0;i<app.indexSongSet.length-1;i++){

            
                  if(app.indexSongSet[app.indexSongSet.length-1]===app.indexSongSet[i])
                     { 
                        app.isSong=false
                       app.indexSongSet.pop()
                      
                     }
                    }
            app.currentIndex=app.indexSongSet[app.indexSongSet.length-1]
        }else{

        

            for(let i=0;i<app.indexSongSet.length-1;i++){
                if(this.currentIndex===app.indexSongSet[i]){
                    app.currentIndex=app.indexSongSet[i+1]
                    break;
                }
                 
            }
        
                  
        } 
                        
        
    }
   
      this.loading()
      console.log(app.indexSongSet,app.currentIndex)
    },
    prevSong:function(){

        if(app.isRandom===false){
            this.currentIndex--;
      if(this.currentIndex<0)
          app.currentIndex=app.songs.length-1
          
      }else{
        if(app.indexSongSet.length===0||app.currentIndex===app.indexSongSet[0]){
            
                app.currentIndex=Math.floor(Math.random()*(app.songs.length))
           
                 app.indexSongSet.unshift(app.currentIndex)
             for(let i=1;i<app.indexSongSet.length;i++){
    
            
                  if(app.indexSongSet[0]===app.indexSongSet[i])
                     { 
                        app.isSong=true
                       app.indexSongSet.shift()
                      
                     }
                   
           
          }
          app.currentIndex=app.indexSongSet[0];
        }
          else  if(app.indexSongSet.length===app.songs.length){
            app.indexSongSet.splice(0,app.indexSongSet.length)
            app.indexSongSet.unshift(app.currentIndex)
            
        }
           else{
             for(let i=1;i<app.indexSongSet.length;i++){
                 if(this.currentIndex===app.indexSongSet[i]){
                      app.currentIndex=app.indexSongSet[i-1]
                      break;
                 }
                
             }
              }
             
              
          
      }
      this.loading()
          console.log(app.indexSongSet,app.currentIndex)
    },
   
   
    start: function(){
        this.defineProperties()
        this.handleEven()
        this.render()
        this.loading()
      
     
    }
}
app.start()
