<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>HM University - Student Orientation</title>
		<meta name="robots" content="noindex, nofollow">
		<meta name="googlebot" content="noindex, nofollow">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans%7COswald&amp;ver=1.0.0" type="text/css" media="all">
		<link rel="stylesheet" href="assets/css/app.min.css">
	</head>
	<body>
		<div id="app">

			<div class="container">

				<div class="menu-wrap">
					<nav class="menu">
						<div class="icon-list">
							<a href="#"><i class="fa fa-fw fa-home"></i><span>Home</span></a>
							<a href="#"><i class="fa fa-fw fa-calendar"></i><span>Events</span></a>
							<a href="#"><i class="fa fa-fw fa-envelope-o"></i><span>Contact</span></a>
						</div><!-- /icon-list -->
					</nav><!-- /menu -->
					<button id="close-button" class="close-button">Close Menu</button>
				</div><!-- /menu-wrap -->

				<div class="header clearfix">
					<a class="logo" href="#">HMU Orientation</a>
					<button id="open-button" class="hamburger hamburger--collapse menu-button" type="button">
						<span class="hamburger-box">
							<span class="hamburger-inner"></span>
						</span>
						<span class="label">Menu</span>
					</button>
				</div><!-- /header -->

				<div class="content-wrap clearfix">
					<div class="content">

						<div class="events-meta clearfix">
							<span class="events-date">Saturday July 15</span>
							<span class="events-number"><span class="number">{{ eventsCount }}</span> Events</span>
						</div>

						<div class="events">
							<div v-for="event in events">
								<a href="#" target="_blank" class="event">
									<h3 class="event-title"><div v-html="event.title.rendered"></div></h3>
									<span class="event-meta">
										<span class="time">
											<i class="fa fa-clock-o" aria-hidden="true"></i>
											<span class="time-text">{{ event.acf.event_start_time }}</span>
										</span>
										<span class="sep">|</span>
										<span class="location">
											<i class="fa fa-map-marker" aria-hidden="true"></i>
											<span class="location-text">Main Auditorium</span>
										</span>
									</span>
								</a>
							</div>
						</div>
					</div>
				</div><!-- /content-wrap -->

				<div class="footer">&copy; <?php echo date( 'Y' ); ?> HM University. All rights reserved.</div><!-- /content-wrap -->

			</div><!-- /container -->

		</div><!-- /app -->

		<script type="text/javascript" src="https://unpkg.com/vue@latest/dist/vue.js"></script>
		<script type="text/javascript" src="assets/js/app.min.js"></script>
	</body>
</html>
