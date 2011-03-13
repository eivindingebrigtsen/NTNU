(function(){
	// comment on this subject
	var Project = {
		testMode: true,
		data: {},
		state: {},
		el: {},
		options: {},
		templates: {}		
	};
	window.P = P = Project;
	P.extend = $.extend;
	P.extend(P, {
		log: function(){
			if('console' in window && this.testMode){
				console.log(arguments);
			}
		},
		data : {
			users: ['Admin', 'Eivind'], 
			items: [{
				id: '1',
				title: 'Get milk',
				done: false,
				due: null,
				desc: null
			},{
				id: '2',
				title: 'Get Beer',
				done: true,
				due: null,
				desc: null
			},
			{
				id: '3',
				title: 'Get Ladies',
				done: false,
				due: null,
				desc: null
			}]
		},
		templates: {
			todo_item: '<li id="{{id}}" {{#due}}rel="{{due}}"{{/due}} class="{{#done}}done{{/done}}"><div class="item"><input type="checkbox" {{#done}}checked="checked"{{/done}}><span class="title">{{title}}</span>{{#desc}}<small>{{desc}}</small>{{/desc}}</div></li>',
			add_item: '<input>'
		},
		find: {
			item: function(id){
				for(var a in P.data.items){
					if(P.data.items[a].id === id){
						return P.data.items[a];
					}
				}
			}
		},
		init: function(){			
			var items = this.data.items;
			var markup = '';
			for (var a in items){
				markup += Mustache.to_html(this.templates.todo_item, items[a]);
			}
			this.el.list = $('section > ul');
			this.el.list.html(markup);
			this.el.add = $('#add')
			this.el.add.bind('click', function(){
				P.addItem();
			});
			this.el.list.find('li').live('click', function(){
				var id = $(this).attr('id');
				var item = P.find.item(id);
				item.done = item.done ? false : true;
				$(this).replaceWith(Mustache.to_html(P.templates.todo_item, item));
			});
			
		},
		addItem: function(){

		}
	});
	P.init()
})();