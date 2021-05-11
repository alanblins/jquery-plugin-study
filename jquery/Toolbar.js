var Toolbar = (function ($){
    

    var Toolbar = function(idElement,options){
        this.idElement = idElement;
        this.optionalEvents = options || {};
    }

    Toolbar.prototype.addButton = function(button){
        this.buttons = this.buttons || [];
        this.buttons.push(button);
    }

    Toolbar.prototype.render = function(){
        var element = $(this.idElement).addClass('toolbar');

        var buttonElements = this.buttons.map(function(button,index,array){
            var buttonElement = $('<div></div>');
            buttonElement.addClass('pull-left');
            buttonElement.addClass('buttonToolbar');
            buttonElement.addClass('noselect');
            buttonElement.addClass('buttonToolbar-mouseup');
            
            if(button.onClick){
                var onClick = button.onClick;
                if(button.context){
                    onClick.bind(button.context);
                }
                buttonElement.on('click',onClick);
            }
            buttonElement.on('mouseup',function(e){
                buttonElement.addClass('buttonToolbar-mouseup');
                buttonElement.removeClass('buttonToolbar-mousedown');
            });
            buttonElement.on('mousedown',function(e){
                buttonElement.addClass('buttonToolbar-mousedown');
                buttonElement.removeClass('buttonToolbar-mouseup');
            });
            buttonElement.html(button.title);
            return buttonElement;
        });
        element.append(buttonElements);
    }

    function create(element,options){
        return new Toolbar(element,options);
    }
    return {
        create:create
    }
    
})(jQuery);