//#region Past implementation of pages

// document
// 	.querySelector('#modules-page-link')
// 	.addEventListener('click', (event) => {
// 		let top =
// 			document.getElementById('modules').getBoundingClientRect().top -
// 			navHeight
// 		if (top != 0) {
// 			window.scrollTo(
// 				0,
// 				top - document.body.getBoundingClientRect().top
// 			)
// 		}
// 	})
// document
// 	.querySelector('#widgets-page-link')
// 	.addEventListener('click', (event) => {
// 		let top =
// 			document.getElementById('widgets').getBoundingClientRect().top -
// 			navHeight
// 		console.log(document.body.getBoundingClientRect().top)
// 		if (top != 0) {
// 			window.scrollTo(
// 				0,
// 				top - document.body.getBoundingClientRect().top
// 			)
// 		}
// 	})

// SetPage()

// ====================================================================================

// function SetPage() {
// 	if (
// 		modulesSection.getBoundingClientRect().top < window.innerHeight / 5 &&
// 		modulesSection.getBoundingClientRect().bottom > window.innerHeight / 5
// 	) {
// 		modulesPageLink.classList.add('is-active')
// 	} else {
// 		modulesPageLink.classList.remove('is-active')
// 	}

// 	if (
// 		widgetsSection.getBoundingClientRect().top < window.innerHeight / 5 &&
// 		widgetsSection.getBoundingClientRect().bottom > window.innerHeight / 5
// 	) {
// 		widgetsPageLink.classList.add('is-active')
// 	} else {
// 		widgetsPageLink.classList.remove('is-active')
// 	}
// }

//#endregion
