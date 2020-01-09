export class Observer {
    constructor () {
        let MutationObserver = ((W)=>{
            return W.MutationObserver || W.WebKitMutationObserver || W.MozMutationObserver;
        })()

        if(!!MutationObserver){
            new MutationObserver((mutations) => {
                let length = mutations.length -1
                    mutations.forEach((item,index) => {
                    if(this.options['snap']){
                        this.refresh()
                    }else{
                        if(length === index){
                            let timer = setTimeout(()=>{
                                this.refresh()
                                clearTimeout (timer)
                            },30)
                        }
                    }
                });
            }).observe(element.children[1],{
                "childList" : true,
                "subtree" : true
            });
        };
    }

}
