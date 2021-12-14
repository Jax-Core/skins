document.addEventListener('DOMContentLoaded', (event) => {
	// hamburger
	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(
		document.querySelectorAll('.navbar-burger'),
		0
	)

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
		// Add a click event on each of them
		$navbarBurgers.forEach((el) => {
			let children = el.children
			// Get the target from the "data-target" attribute
			const target = el.dataset.target
			const $target = document.getElementById(target)
			el.addEventListener('click', function (event) {
				console.log(event.currentTarget)
				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active')
				$target.classList.toggle('is-active')
			})
		})
	}

	// link buttons
	const navlogo = document.querySelector('.navbar-item img')
	navlogo.addEventListener('click', () => {
		window.location.href = 'https://jax-core.github.io'
	})

	// donation button
	const donation = document.getElementById('donation')
	donation.addEventListener('click', () => {
		window.open(
			'https://ko-fi.com/jaxoriginals',
			'Jax - KoFi',
			'height=500, width=400'
		)
	})

	const module_cards = document.getElementById('module-preview-cards')
	const widget_cards = document.getElementById('widget-preview-cards')
	const modulesJson = JSON.parse(modules_data)
	const widgetsJson = JSON.parse(widgets_data)

	let cardTemplate = document.getElementById('cardTemplate')

	modulesJson.forEach((skin) => {
		let cardClone = cardTemplate.content.cloneNode(true)

		cardClone.querySelector('.image').querySelector('.preview-image').src =
			skin.background
		cardClone.querySelector('.title').textContent = skin.title
		cardClone.querySelector('.subtitle').textContent = skin.subs
		cardClone.querySelector('.skinDesc').innerHTML = skin.description

		let box = cardClone.querySelector('.box')

		box.setAttribute('data-deviantart', skin.deviantart)
		box.setAttribute('data-download', skin.download_api)
		box.setAttribute('data-install', skin.install_name)

		module_cards.appendChild(cardClone)
	})

	widgetsJson.forEach((skin) => {
		let cardClone = cardTemplate.content.cloneNode(true)

		cardClone.querySelector('.image').querySelector('.preview-image').src =
			skin.background
		cardClone.querySelector('.title').textContent = skin.title
		cardClone.querySelector('.subtitle').textContent = skin.subs
		cardClone.querySelector('.skinDesc').textContent = skin.description

		let box = cardClone.querySelector('.box')

		box.setAttribute('data-deviantart', skin.deviantart)
		box.setAttribute('data-download', skin.download_api)
		box.setAttribute('data-install', skin.install_name)

		widget_cards.appendChild(cardClone)
	})

	const cardBoxes = document.querySelectorAll('.preview-card')

	cardBoxes.forEach((card) => {
		$clamp(card.querySelector('.skinDesc'), { clamp: 3 })
		card.addEventListener('click', (event) => {
			ShowMainPreview({
				title: card.querySelector('.title').textContent,
				subs: card.querySelector('.subtitle').textContent,
				description: card.querySelector('.skinDesc').textContent,
				image: card
					.querySelector('.image')
					.querySelector('.preview-image').src,
				deviantart: card.getAttribute('data-deviantart'),
				download: card.getAttribute('data-download'),
				install: card.getAttribute('data-install'),
			})
		})
	})

	let navHeight = document
		.getElementById('navbar')
		.getBoundingClientRect().height

	let modulePreviewCards = document.getElementById('module-preview-cards')
	let widgetPreviewCards = document.getElementById('widget-preview-cards')
	let modulesPageLink = document.querySelector('#modules-page-link')
	let widgetsPageLink = document.querySelector('#widgets-page-link')

	modulesPageLink.addEventListener('click', (event) => {
		widgetsPageLink.classList.remove('is-active')
		modulesPageLink.classList.add('is-active')
		widgetPreviewCards.classList.remove('is-active')
		modulePreviewCards.classList.add('is-active')
	})

	widgetsPageLink.addEventListener('click', (event) => {
		modulesPageLink.classList.remove('is-active')
		widgetsPageLink.classList.add('is-active')
		modulePreviewCards.classList.remove('is-active')
		widgetPreviewCards.classList.add('is-active')
	})
})

var modal = document.getElementById('main-modal')
var mainPreviewTitle = document.querySelector('#main-preview-title')
var mainPreviewSubtitle = document.querySelector('#main-preview-subtitle')
var mainPreviewDescription = document.querySelector('#main-preview-description')
var mainPreviewImage = document.querySelector('#main-preview-image')
var deviantart = document.getElementById('deviantart-button')
var skindownload = document.getElementById('download-button')
var skininstall = document.getElementById('install-button')

if (navigator.userAgent.indexOf('Win') == -1) {
	skininstall.style.display = 'none'
}

var modalBack = document.getElementById('modal-background')

modalBack.addEventListener('click', (event) => {
	modal.classList.add('is-inactive')
	setTimeout(() => {
		modal.classList.remove('is-active')
	}, 450)
})

function ShowMainPreview(data) {
	mainPreviewTitle.textContent = data.title
	mainPreviewSubtitle.textContent = data.subs
	mainPreviewDescription.textContent = data.description
	mainPreviewImage.src = data.image

	deviantart.addEventListener('click', (event) => {
		window.open(data.deviantart)
	})

	skindownload.addEventListener('click', (event) => {
		if (navigator.userAgent.indexOf('Win') == -1) {
			Swal.fire({
				title: '<p style="color: #facea8">Incompatible Device</p>',
				html: 'This software is intended for Windows devices only. Download anyway?',
				icon: 'warning',
				imageWidth: 128,
				imageHeight: 128,
				background: '#181a1b',
				showDenyButton: true,
				confirmButtonText: 'Download',
				denyButtonText: 'Cancel',
			}).then((result) => {
				if (result.isConfirmed) {
					DownloadLatestSkin(data.download)
				}
			})
		} else {
			DownloadLatestSkin(data.download)
		}
	})

    skininstall.addEventListener('click', (event) => {
		Swal.fire({
			title: '<p class="title has-text-white">This is a WIP feature. Stay tuned!</p>',
			icon: 'info',
			background: '#181a1b',
		})
		// location.href = `rm-coreinstaller:[!ActivateConfig "#JaxCore\\CoreInstaller"][!CommandMeasure DelayedBanger "GetSkin('${data.install}')" "#JaxCore\\CoreInstaller"`
	})

	modal.classList.remove('is-inactive')
	modal.classList.add('is-active')
}

let navScrollElements = document.querySelectorAll(
	'.navbar.has-background-transparent'
)

function DownloadLatestSkin(api_url) {
	skindownload.classList.add('is-loading')
	fetch(api_url)
		.then((response) => response.json())
		.then((api_data) => {
			api_data.assets.forEach((asset) => {
				if (asset.browser_download_url.indexOf('.rmskin') != -1) {
					location.href = asset.browser_download_url
				}
			})
		})
		.then(() => {
			skindownload.classList.remove('is-loading')
		})
}

window.addEventListener('scroll', (event) => {
	var scrollTop =
		window.pageYOffset !== undefined
			? window.pageYOffset
			: (
					document.documentElement ||
					document.body.parentNode ||
					document.body
			  ).scrollTop

	if (scrollTop !== 0) {
		navScrollElements.forEach((el) => {
			el.classList.add('scrolled')
		})
	} else {
		navScrollElements.forEach((el) => {
			el.classList.remove('scrolled')
		})
	}

	// SetPage()
})
