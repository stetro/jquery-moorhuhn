jQuery(function() {

	function Feld() {
		this.vogel1 = new Image();
		this.vogel2 = new Image();
		this.vogel3 = new Image();
		this.vogel4 = new Image();
		this.vogel5 = new Image();
		this.vogel6 = new Image();
		this.vogel1.src = "img/Vogel1.png";
		this.vogel2.src = "img/Vogel2.png";
		this.vogel3.src = "img/Vogel3.png";
		this.vogel4.src = "img/Vogel4.png";
		this.vogel5.src = "img/Vogel5.png";
		this.vogel6.src = "img/Vogel6.png";
		this.punkte = 0;
		this.zeit = 900;
	}
	function Vogel(posY, dir, size) {
		if (parseInt(Math.random() * 100) > 50)
			this.direction = 1;
		else
			this.direction = -1;

		this.x = (this.direction == 1) ? -70 : 480;
		this.y = parseInt(Math.random() * 270);
		this.bird = 1;
		this.speed = 4 + parseInt(Math.random() * 3);
		this.img = (this.direction == 1) ?feld.vogel1:feld.vogel4;
		this.scale = 0.5 + (Math.random() * 0.5);
		this.isalive = true;
	}
	/*
	 * Initialisierung
	 */
	// CanvasInit
	var canvas = document.getElementById('feld');
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		setInterval(game_loop, 100);
		setInterval(add_bird, 1000);
		ctx.globalCompositeOperation = 'destination-over';
	}
	// Voegel und Feld initialisierung
	var feld = new Feld();
	vogel = new Array();
	vogel.push(new Vogel());

	function game_loop() {
		if (feld.zeit > 0) {
			ctx.clearRect(0, 0, 480, 320); // CLS
			draw_birds(); // zeichne Voegel
			change_bird(); // wechsel image & pos
			$("#zeit").val(parseInt(feld.zeit / 10));
			feld.zeit--;
		} else {
			ctx.clearRect(0, 0, 480, 320); // CLS
			for ( var i = 0; i < vogel.length; i++) {
				vogel.push();
			}
			//document.refresh();
			$("#zeit").val("Ende");
		}

	}

	/*
	 * Wechselt Bilder und Position
	 */
	function change_bird() {
		for ( var i = 0; i < vogel.length; i++) {
			if (vogel[i].isalive == true) {
				switch (vogel[i].img) {
				case feld.vogel1:
					vogel[i].img = feld.vogel3;
					break;
				case feld.vogel2:
					vogel[i].img = feld.vogel1;
					break;
				case feld.vogel3:
					vogel[i].img = feld.vogel2;
					break;
				case feld.vogel4:
					vogel[i].img = feld.vogel6;
					break;
				case feld.vogel5:
					vogel[i].img = feld.vogel4;
					break;
				case feld.vogel6:
					vogel[i].img = feld.vogel5;
					break;
				}
				if (vogel[i].direction >= 1) {
					vogel[i].x += vogel[i].speed;
				} else {
					vogel[i].x -= vogel[i].speed;
				}
			} else if (vogel[i].y <= 320) {

				vogel[i].y += 15;
			}
		}
	}
	/*
	 * Alle 3 Sekunden respawn
	 */
	function add_bird() {
		vogel.push(new Vogel());
	}
	/*
	 * zeichnet alle Voegel
	 */
	function draw_birds() {
		for ( var i = 0; i < vogel.length; i++) {
			if (vogel[i].isalive == true || vogel[i].x > -70
					|| vogel[i].x <= 480) {
				if (vogel[i].direction == 1)
					ctx.drawImage(vogel[i].img, vogel[i].x, vogel[i].y,
							70 * vogel[i].scale, 50 * vogel[i].scale);
				else {
					// vogel[i].img.transform(-70 * vogel[i].scale, -50 *
					// vogel[i].scale);
					ctx.drawImage(vogel[i].img, vogel[i].x, vogel[i].y,
							70 * vogel[i].scale, 50 * vogel[i].scale);
					// ctx.translate();
				}
			}
		}
	}
	/*
	 * Schießen (iPhone durch tab ersetzen)
	 */
	$("#feld").click(
			function(e) {
				// alert(e.pageX+" - "+e.pageY);
				for ( var i = 0; i < vogel.length; i++) {
					if (e.pageX > vogel[i].x
							&& e.pageX < (vogel[i].x + (70 * vogel[i].scale))
							&& e.pageY > vogel[i].y
							&& e.pageY < (vogel[i].y + (50 * vogel[i].scale))) {
						vogel[i].isalive = false;
						feld.punkte += parseInt(20 * (1 / vogel[i].scale));
						$("#punkte").val(feld.punkte);
					}
				}
			});
});