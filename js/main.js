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
			})
			window.scrollTo({ top: 0, behavior: 'smooth' })
		})
	})
})

var mainPreviewTitle = document.querySelector('#main-preview-title')
var mainPreviewSubtitle = document.querySelector('#main-preview-subtitle')
var mainPreviewDescription = document.querySelector('#main-preview-description')
var mainPreviewStats = document.querySelector('#main-preview-stats')
var mainPreviewImage = document.querySelector('#main-preview-image')

function ShowMainPreview(data) {
	mainPreviewTitle.querySelector('strong').textContent = data.title
	mainPreviewSubtitle.textContent = data.subs
	mainPreviewDescription.textContent = data.description
	mainPreviewImage.src = data.image
	mainPreviewStats.style.display = 'flex'
}

let navScrollElements = document.querySelectorAll(
	'.navbar.has-background-transparent'
)

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