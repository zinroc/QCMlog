<?php
/**
 * Specify navbar items in a standardized way
 * For dropdown items: {'text': <dropdown header text>, 'dropdown': <array of links>}
 * For regular links: {'text': <link text>, 'href': <URL for link, specified as <controller>/<function>>}
 */

function is_active($navbar_item) {
    return $navbar_item['href'] === current_url();
}
?>

<!-- bootstrap template -->
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div id="header" class="container-fluid">
    	<div class="navbar-header">
    		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#super-awesome-game-navbar">
                <span class="sr-only">Toggle Navigation</span>
    			<span class="icon-bar"></span>
    			<span class="icon-bar"></span>
    			<span class="icon-bar"></span>
    		</button>
            <a class="navbar-brand" href="#">QCM-D Log</a>
        </div>

        <div class="collapse navbar-collapse" id="super-awesome-game-navbar">
    		<ul class="nav navbar-nav" id="tabs">
    			<?php


                    $navbar_items = array(
                        array("text" => "Home", "href" => "welcome/home"),
                        array("text" => "Record", "href" => "welcome/QCM"), 
                        array("text" => "Explore", "href" => "welcome/explore"), 

                    );

                    foreach($navbar_items as &$navbar_item) {
                        if (isset($navbar_item['dropdown'])) {
                            echo "<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown'>" . $navbar_item['text'];
                            echo "<span class='caret'></span>";
                            echo  "</a>";
                            echo "<ul class='dropdown-menu'>";
                            foreach ($navbar_item['dropdown'] as &$dropdown_item) {
                                echo "<li><a href='" . site_url($dropdown_item['href']) . "'>" . $dropdown_item['text'] . "</a></li>";
                            }
                            echo "</ul>";
                            echo "</li>";
                        } else {
                            $active_text = is_active($navbar_item) ? " class='active'" : "";
                            echo "<li" . $active_text . "><a href='" . site_url($navbar_item['href']) . "'>" . $navbar_item['text'] . "</a></li>";
                        }
                    }
    			?>
    		</ul> <!-- left group -->

            <?php
                function navbar_text ($text, $id=null) {
                    echo "<li><p class='navbar-text' id='" . $id . "'>" . $text . "</p></li>";
                }

                if (isset($_SESSION['username'])) {
                    echo "<ul class='nav navbar-nav navbar-right'>";
                    if (isset($_SESSION['char_name'])) {
                        navbar_text($_SESSION['char_name'], "charname");
                        navbar_text("&middot;", "intermezzo");
                    }

                    navbar_text($_SESSION['username'], "username");
                    echo "</ul>";
                }
            ?>
    	</div> <!-- end nav-collapse -->
    </div> <!-- end container-fluid -->
</nav> <!-- end navbar -->
