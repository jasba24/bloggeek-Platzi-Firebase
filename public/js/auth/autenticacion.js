class Autenticacion {
	autEmailPass(email, password) {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(res => {
				if (res.user.emailVerified) {
					$("#avatar").attr("src", "imagenes/usuario_auth.png")
					Materialize.toast(`Bienvenido ${res.user.displayName}`, 5000)
				} else {
					firebase.auth().signOut()
					Materialize.toast(
						`Por favor realiza la verificación de la cuenta`,
						5000
					)
				}
				$(".modal").modal("close")
			})
	}

	crearCuentaEmailPass(email, password, nombres) {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(res => {
				res.user.updateProfile({
					displayName: nombres,
				})

				const config = {
					url: "http://localhost:3000/",
				}

				res.user.sendEmailVerification(config).catch(err => {
					console.log(err)
					Materialize.toast(err.message, 400)
				})

				firebase.auth().signOut()

				Materialize.toast(
					`Bienvenido ${nombres}, debes realizar el proceso de verificación`,
					4000
				)

				$(".modal").modal("close")
			})
			.catch(err => {
				console.log(err)
				Materialize.toast(err.message, 400)
			})
	}

	resetPassword(email) {
		if (email) {
			const config = {
				url: "http://localhost:3000/",
			}
			firebase
				.auth()
				.sendPasswordResetEmail(email, config)
				.then(() => {
					$(".modal").modal("close")
					Materialize.toast(
						`Tu correo de recuperacion de contraseña ha sido enviado`,
						4000
					)
				})
		} else {
			Materialize.toast(
				`Por favor ingrese un correo válido`,
				4000
			)
		}
	}

	authCuentaGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider()
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(res => {
				$("#avatar").attr("src", res.user.photoURL)
				$(".modal").modal("close")
				Materialize.toast(`Bienvenido ${res.user.displayName} !! `, 4000)
			})
			.catch(err => {
				console.log(err)
				Materialize.toast(`Error al autenticarse con google ${err}`, 4000)
			})
	}

	authCuentaFacebook() {
		const provider = new firebase.auth.FacebookAuthProvider()
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(result => {
				$("#avatar").attr("src", result.user.photoURL)
				$(".modal").modal("close")
				Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
			})
			.catch(error => {
				console.error(error)
				Materialize.toast(`Error al autenticarse con facebook: ${error} `, 4000)
			})
	}

	authTwitter() {
		// TODO: Crear auth con twitter
	}
}
