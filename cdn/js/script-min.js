$(function(){var e=$(window),a=$(".mixer"),t=$(".main section"),s=$("#navbarNav");$(".navbar .nav-item, .navbar .navbar-brand").on("click",function(e){var a,t,i=window.location;a=$(this).find("a").attr("href")||$(this).attr("href"),["/booking.php","/clients.php","/gearlist.php"].indexOf(i.pathname)>=0?window.location=i.protocol+"//"+i.host+"/"+a:(t=$(a).offset(),e.preventDefault(),s.find(".active").removeClass("active"),$(this).addClass("active"),window.scroll({top:t.top,left:0,behavior:"smooth"}),history.pushState?history.pushState(null,null,a):location.hash="#myhash")}),$(".navbar-collapse a").click(function(){$(".navbar-collapse").collapse("hide")}),e.on("scroll",function(i){var r,o=e.scrollTop();a.length&&((r=a.css("backgroundPosition").split(" "))[1]=0+o/5+"px",a.css("backgroundPosition",r.join(" ")),t.each(function(){var e=$(this)[0];Math.abs(e.offsetTop-o)<20&&(s.find(".active").removeClass("active"),s.find('a[href="#'+e.id+'"]').addClass("active"))}))}),$("form").submit(function(e){var a=$("#name"),t=$("#email"),s=$("#start-date"),i=$("#end-date"),r=$("#message"),o=$("#service"),n=($(".g-recaptcha :first-child")[0],!1);grecaptcha.getResponse()?$(".g-recaptcha :first-child").first().css("border","none"):($(".g-recaptcha :first-child").first().css("border","1px solid red"),n=!0,e.preventDefault()),a.val().trim()?(a.removeClass("is-invalid"),a.addClass("is-valid")):(a.removeClass("is-valid"),a.addClass("is-invalid"),n=!0,e.preventDefault()),t.val().match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)?(t.removeClass("is-invalid"),t.addClass("is-valid")):(t.removeClass("is-valid"),t.addClass("is-invalid"),n=!0,e.preventDefault()),!s.val().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)||new Date(s.val()).getTime()<(new Date).getTime()?(s.removeClass("is-valid"),s.addClass("is-invalid"),n=!0,e.preventDefault()):(s.removeClass("is-invalid"),s.addClass("is-valid")),!i.val().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)||new Date(i.val()).getTime()<new Date(s.val()).getTime()?(i.removeClass("is-valid"),i.addClass("is-invalid"),n=!0,e.preventDefault()):(i.removeClass("is-invalid"),i.addClass("is-valid")),r.val().trim()?(r.removeClass("is-invalid"),r.addClass("is-valid")):(r.removeClass("is-valid"),r.addClass("is-invalid"),n=!0,e.preventDefault()),service.val().trim()?(o.removeClass("is-invalid"),o.addClass("is-valid")):(o.removeClass("is-valid"),o.addClass("is-invalid"),n=!0,e.preventDefault()),n||$(this).unbind("submit").submit()});var i=window.location.hash;"#thanks"===i?$("#userMessage").addClass("alert alert-success").html("Thank you for contacting us. We will get back to you as soon as possible"):"#error"===i&&$("#userMessage").addClass("alert alert-danger").html("There was an error submitting the form. Please try again.");var r=$("#clientRows");if(r.length)for(var o="",n=0;n<works.length;n++){var l=works[n].artistName,d=works[n].albumName,c=works[n].description,m=works[n].coverArt,u=works[n].artistLink,p=works[n].albumLink,h=works[n].jobType;if(o+='\n    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">\n      <div class="card">\n        <div class="card-body">',o+=u.length?`<p class="card-text"><strong>Artist:</strong> <a href="${u}" target="_blank" rel="noreferrer">${l}</a></p>`:`<p class="card-text"><strong>Artist:</strong> ${l}</p>`,o+=p.length?`<p class="card-text"><strong>Album:</strong> <a href="${p}" target="_blank" rel="noreferrer">${d}</a></p>`:`<p class="card-text"><strong>Album:</strong> ${d}</p>`,o+=`\n          <p class="card-text"><strong>Job Type:</strong> ${h}</p>\n          <p class="card-text"><strong>Description:</strong> ${c}</p>\n        </div>`,o+=m.length?`<img class="card-img-top" src="${m}" alt="${l} - ${d}">`:"",o+="</div></div>",r.append(o),o="",n===works.lenth)break;0!==n&&(n+1)%4==0&&r.append('<div class="row"></div>')}});var works=[{artistName:"27 South",albumName:"27 South (LP)",description:"27 South was a southern heavy metal band from Tallahassee, FL. 'Pantera riffs and Slayer speeds'",coverArt:"https://cdn.mazureth.com/images/artists/27_South.jpg",artistLink:"",albumLink:"",jobType:"Full Production"},{artistName:"400.40",albumName:"MMXVII (EP)",description:"Follow up to the bands debut EP release, this released explored a wider range of musical styles dipping into blues and hip hop.",coverArt:"https://cdn.mazureth.com/images/artists/400.40_-_MMXVII.jpg",artistLink:"",albumLink:"https://soundcloud.com/the40040official/sets/mmxvii",jobType:"Full Production"},{artistName:"400.40",albumName:"Wasted Time (EP)",description:"Seattle piano driven indie rock with hints of jass and hip hop.",coverArt:"https://cdn.mazureth.com/images/artists/400.40_-_Wasted_Time.jpg",artistLink:"",albumLink:"https://soundcloud.com/the40040official/sets/wasted-time",jobType:"Full Production"},{artistName:"Alpenglow",albumName:"Demo (Demo)",description:"Seattle based progressive bluegrass band that has just hit the scene, they wanted a demo to send to venues for booking.",coverArt:"https://cdn.mazureth.com/images/artists/alpenglow.jpg",artistLink:"https://www.facebook.com/AlpenglowSeattle/",albumLink:"",jobType:"Full Production"},{artistName:"Anthrocene",albumName:"Nucleation (LP)",description:"Seattle based power thrash metal that takes listeners on a wild journey of fiction centering around a fire wielding demon",coverArt:"https://cdn.mazureth.com/images/artists/anthrocene.jpg",artistLink:"https://www.facebook.com/anthroceneband/",albumLink:"https://open.spotify.com/album/1rZ0TSTy1MJpyL17ZLNxAb?si=qMPs6hXdTuqAVABHtVZxwA",jobType:"Tracking"},{artistName:"The Avenue",albumName:"8-Track Diaries (EP)",description:"Tallahassee based indie emo punk rock",coverArt:"https://cdn.mazureth.com/images/artists/avenue_1.jpg",artistLink:"",albumLink:"",jobType:"Full Production"},{artistName:"The Avenue",albumName:"The Process of Eliminating Options (LP)",description:"The Avenue's first (and only) full length album with catchy riffs and clever lyrics that defined this era of power pop punk",coverArt:"https://cdn.mazureth.com/images/artists/avenue_2.jpg",artistLink:"",albumLink:"",jobType:"Full Production"},{artistName:"Castle Dwellers",albumName:"??? (LP)",description:"Catchy guitar driven indie rock with obvious blues influences",coverArt:"https://cdn.mazureth.com/images/artists/castle-dwellers.jpg",artistLink:"https://open.spotify.com/artist/4Lb6DpAcqn6Y21HkOsjyHA?si=3U0MPlssQxKHFqe5MP16ZA",albumLink:"",jobType:"Full Production"},{artistName:"The Divide Comedy Club",albumName:"Nothing Cool Happens In Heaven (Single)",description:"Seattle based atmosphereic and psychadelic band's second single release, fronted by a powerful female vocalist.",coverArt:"https://cdn.mazureth.com/images/artists/dcc_-_heaven.JPG",artistLink:"",albumLink:"",jobType:"Full Production"},{artistName:"The Divide Comedy Club",albumName:"Out For Launch (Single)",description:"Seattle based atmosphereic and psychadelic band's first single release, fronted by a powerful female vocalist.",coverArt:"https://cdn.mazureth.com/images/artists/dcc_-_launch.JPG",artistLink:"",albumLink:"",jobType:"Full Production"},{artistName:"Glen Ridge",albumName:"Glen Ridge (LP)",description:"Folky bluegrass musings of singer/songwriter Glen Ridge.",coverArt:"https://cdn.mazureth.com/images/artists/glen_ridge.png",artistLink:"",albumLink:"",jobType:"Full Production"},{artistName:"Luna Nova",albumName:"What are you, gay? (EP)",description:"Trip hop, jazztronic, downtemp songs about coming out as a non-binary",coverArt:"https://cdn.mazureth.com/images/artists/lunanova.jpg",artistLink:"",albumLink:"",jobType:"Full Production"},{artistName:"Miners Work",albumName:"Miners Work (LP)",description:"Tallahasse based indie frat rock",coverArt:"https://cdn.mazureth.com/images/artists/miners_work.jpg",artistLink:"",albumLink:"https://soundcloud.com/user-359899219/sets/miners-work",jobType:"Full Production"},{artistName:"Plateau",albumName:"Everything Was Sweet (LP)",description:"Seattle based indie rock band with clear influences from both the gunge era as well as the British pop invasion of the 60s.",coverArt:"https://cdn.mazureth.com/images/artists/plateau.jpg",artistLink:"https://plateauseattle.bandcamp.com/",albumLink:"",jobType:"Mixing"},{artistName:"Red Is Recovery",albumName:"Red Is Recovery (LP)",description:"Debut album of Tallahassee based indie rock band that kicked off local fame leading to regional followings and label attention.",coverArt:"https://cdn.mazureth.com/images/artists/red_is_recovery.jpg",artistLink:"https://myspace.com/redisrecovery",albumLink:"https://soundcloud.com/user-359899219/sets/red-is-recovery-the-red-album",jobType:"Full Production"},{artistName:"Red Is Recovery",albumName:"Goodbyes Are New Beginnings (EP)",description:"The follow up to their debut album released immedately before the band relocated to Orlando, FL.",coverArt:"https://cdn.mazureth.com/images/artists/red_is_recovery_2.jpg",artistLink:"https://myspace.com/redisrecovery",albumLink:"https://soundcloud.com/user-359899219/sets/red-is-recovery-goodbyes-are-new-beginnings",jobType:"Full Production"}];
