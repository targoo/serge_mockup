<?php
session_start();
require_once("twitteroauth/twitteroauth.php");

// Replace the keys below - Go to https://dev.twitter.com/apps to create the Application
$consumerkey = "12345";
$consumersecret = "123456789";
$accesstoken = "123456789";
$accesstokensecret = "12345";


$twitteruser = $_GET['twitteruser'];
$notweets = $_GET['notweets'];

function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
	$connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
	return $connection;
}

$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);

echo json_encode($tweets);
?>