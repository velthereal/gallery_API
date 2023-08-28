document.addEventListener('DOMContentLoaded', ()=>{
	let img_tab = document.getElementById('image');
	let video_tab = document.getElementById('video');
	let images_choice = document.querySelector('.images');
	let videos_choice = document.querySelector('.videos');
	let content = document.querySelector('.content');


	img_tab.addEventListener('click', function(){
		img_tab.classList.add('active');
		video_tab.classList.remove('active');
		images_choice.classList.remove('none');
		videos_choice.classList.add('none');
		content.classList.add('none');
	});
	video_tab.addEventListener('click', function(){
		img_tab.classList.remove('active');
		video_tab.classList.add('active');
		images_choice.classList.add('none');
		videos_choice.classList.remove('none');
		content.classList.add('none');
	});

	let $type_img = document.querySelectorAll('.images input[name="type"]');
	let $category_img = document.querySelectorAll('.images input[name="category"]');
	let $colors_img = document.querySelectorAll('.images input[name="colors"]');
	let type_img;
	let category_img;
	let colors_img;
	let number_img;
	let submit_img = document.querySelector('.images button');
	submit_img.addEventListener('click', ()=> {
		for(let i = 0; i < $type_img.length; i++){
			if($type_img[i].checked){
				type_img = $type_img[i].value;
			}
		}
		for(let i = 0; i < $category_img.length; i++){
			if($category_img[i].checked){
				category_img = $category_img[i].value;
			}
		}
		for(let i = 0; i < $colors_img.length; i++){
			if($colors_img[i].checked){
				colors_img = $colors_img[i].value;
			}
		}
		number_img = document.querySelector('.images input[type="number"]').value;
		images_choice.classList.add('none');

		let url_images = `https://pixabay.com/api/?key=14304821-db198647e0592cf253911c94a&category=${category_img}&image_type=${type_img}&colors=${colors_img}$per_page=${number_img}`;
		fetch(url_images)
		.then((response)=> {
			return response.json();
		})
		.then((data)=>{
			showImg(data.hits)
		})
	
		function showImg(data){
			let content = document.querySelector('.content');
			let list = `<ul>`
			list += data.map(img => {
				return `<li><img src="${img.largeImageURL}" alt="${img.tags}"/></li>`
			}).join('')
			list += `</ul>`;
			content.insertAdjacentHTML('afterbegin', list);
			activeImg();
		}
	
		function activeImg(){
			let list = document.querySelectorAll('ul img');
			let img = document.querySelector('.wrapper');
			let content = document.querySelector('.wrapper .box');
			let picture = document.querySelector('.wrapper .box img');
			let exit = document.querySelector('.wrapper i');
			for(let i = 0; i < list.length; i++){
					list[i].addEventListener('click', function(){
						picture.src = this.src;
						img.classList.add('visible');
						content.classList.add('visible');
					})
			}
			exit.addEventListener('click', function(){
				img.classList.remove('visible');
				content.classList.remove('visible');
			})
		}
	});

// ---------------------------------------------------
	let $type_video = document.querySelectorAll('.videos input[name="type"]');
	let $category_video = document.querySelectorAll('.videos input[name="category"]');
	let type_video;
	let category_video;
	let number_video;
	let submit_video = document.querySelector('.videos button');
	submit_video.addEventListener('click', ()=> {
		for(let i = 0; i < $type_video.length; i++){
			if($type_video[i].checked){
				type_video = $type_video[i].value;
			}
		}
		for(let i = 0; i < $category_video.length; i++){
			if($category_video[i].checked){
				category_video = $category_video[i].value;
			}
		}
		number_video = document.querySelector('.videos input[type="number"]').value;
		videos_choice.classList.add('none');

		let url_videos = `https://pixabay.com/api/videos/?key=14304821-db198647e0592cf253911c94a&video_type=${type_video}&category=${category_video}&per_page=${number_video}`;
		fetch(url_videos)
		.then((response)=> {
			return response.json();
		})
		.then((data)=>{
			showVideo(data.hits)
		})

		function showVideo(data){
			let content = document.querySelector('.content');
			let list = `<ul>`
			list += data.map(img => {
				return `<li><video controls><source src="${img.videos.medium.url}"></video></li>`
			}).join('')
			list += `</ul>`;
			content.insertAdjacentHTML('afterbegin', list);
			activeVideo();
		}

		function activeVideo(){
			let list = document.querySelectorAll('ul video');
			let img = document.querySelector('.wrapper');
			let content = document.querySelector('.wrapper .box');
			let picture = document.querySelector('.wrapper .box video source');
			let exit = document.querySelector('.wrapper i');
			for(let i = 0; i < list.length; i++){
					list[i].addEventListener('click', function(){
						picture.src = this.src;
						img.classList.add('visible');
						content.classList.add('visible');
					})
			}
			exit.addEventListener('click', function(){
				img.classList.remove('visible');
				content.classList.remove('visible');
			})
		}
	});
})