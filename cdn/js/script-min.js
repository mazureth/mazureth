$(function(){var a=$(window),s=$(".mixer"),i=$(".main section"),e=$("#navbarNav");$(".navbar .nav-item").on("click",function(a){var s,i;["/booking.html","/clients.html","/gearlist.html"].indexOf(window.location.pathname)>=0||(s=$(this).find("a").attr("href"),i=$(s).offset(),a.preventDefault(),e.find(".active").removeClass("active"),$(this).addClass("active"),window.scroll({top:i.top,left:0,behavior:"smooth"}),history.pushState?history.pushState(null,null,s):location.hash="#myhash")}),$(".navbar-collapse a").click(function(){$(".navbar-collapse").collapse("hide")}),a.on("scroll",function(l){var t,n=a.scrollTop();s.length&&((t=s.css("backgroundPosition").split(" "))[1]=0+n/5+"px",s.css("backgroundPosition",t.join(" ")),i.each(function(){var a=$(this)[0];Math.abs(a.offsetTop-n)<20&&(e.find(".active").removeClass("active"),e.find('a[href="#'+a.id+'"]').addClass("active"))}))}),$("form").submit(function(a){var s=$("#name"),i=$("#email"),e=$("#start-date"),l=$("#end-date"),t=$("#message"),n=($(".g-recaptcha :first-child")[0],!1);grecaptcha.getResponse()?$(".g-recaptcha :first-child").first().css("border","none"):($(".g-recaptcha :first-child").first().css("border","1px solid red"),n=!0,a.preventDefault()),s.val().trim()?(s.removeClass("is-invalid"),s.addClass("is-valid")):(s.removeClass("is-valid"),s.addClass("is-invalid"),n=!0,a.preventDefault()),i.val().match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)?(i.removeClass("is-invalid"),i.addClass("is-valid")):(i.removeClass("is-valid"),i.addClass("is-invalid"),n=!0,a.preventDefault()),e.val().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)?(e.removeClass("is-invalid"),e.addClass("is-valid")):(e.removeClass("is-valid"),e.addClass("is-invalid"),n=!0,a.preventDefault()),l.val().match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)?(l.removeClass("is-invalid"),l.addClass("is-valid")):(l.removeClass("is-valid"),l.addClass("is-invalid"),n=!0,a.preventDefault()),t.val().trim()?(t.removeClass("is-invalid"),t.addClass("is-valid")):(t.removeClass("is-valid"),t.addClass("is-invalid"),n=!0,a.preventDefault()),n||$(this).unbind("submit").submit()});var l=window.location.hash;"#thanks"===l?$("#userMessage").html("Thank you for contacting us. We will get back to you as soon as possible"):"#error"===l&&$("#userMessage").html("There was an error submitting the form. Please try again.")});