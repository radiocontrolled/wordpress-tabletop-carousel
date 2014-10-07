<?php

	//sample function to go in a Wordpress functions.php file
	
	function awards_shortcode_generator(){
		return "<div class='row'>
					<div class='col-sm-12 col-md-12'>
						<section id='past-winners'>
							<main id='pastWinnerViewer'>
								<nav id='past-winnders-nav'>
									<div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
										<ul class='nav navbar-nav hidden-xs hidden-sm'>
											<li class='dropdown'><a href='#' class='dropdown-toggle awards-year' data-toggle='dropdown'>Year<b class='caret'></b></a>
												<ul class='dropdown-menu awards-dropdown-menu'></ul>
											</li>
										</ul>
									</div>
								</nav>
							</main>
						</section>
					</div>
				</div> ";
	}
	
	add_shortcode( 'awards_carousel', 'awards_shortcode_generator' );

?>