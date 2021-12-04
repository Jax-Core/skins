document.addEventListener('DOMContentLoaded', (event) => {
	const cards = document.querySelector('#preview-cards')
	const skinsJson = JSON.parse(skindata)

	let cardTemplate = document.getElementById('cardTemplate')

	skinsJson.forEach((skin) => {
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

		cards.appendChild(cardClone)
	})

	const cardBoxes = document.querySelectorAll('#preview-cards .box')

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
		location.href = `rm-coreinstaller:[!ActivateConfig "#JaxCore\\CoreInstaller"][!CommandMeasure DelayedBanger "GetSkin('${data.install}')" "#JaxCore\\CoreInstaller"`
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
})
