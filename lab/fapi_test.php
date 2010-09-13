<?php
include_once('formstack_api.php');

$result = false;

//$result = Formstack_Api::get_all_forms_json();
//echo $result."\n\n\n";

//$result = Formstack_Api::get_single_form_json(999417);
//echo $result."\n\n\n";

$result = Formstack_Api::get_form_data_json(999417);
echo $result."\n\n\n";

//$result = Formstack_Api::get_single_submission_json(37606942);
//echo $result."\n\n\n";


$data = array(
	"field_9895863" => "Yes",
	"field_9895864" => 3,
	"field_9895862" => "Joe Mama, Mark Timmer, Brandon Ben"
);
//$result = Formstack_Api::submit_form_data_json(999417, $data);
//echo $result."\n\n\n";

$result = json_decode($result, true);
$sub_id = $result["response"]["id"];

$data = array(
	"field_9895863" => "Yes",
	"field_9895864" => 12,
	"field_9895862" => "none of your business"
);
//$result = Formstack_Api::edit_existing_submission_json(37606942, $data);
//echo $result."\n\n\n";

//$result = Formstack_Api::delete_existing_submission_json($sub_id);
//echo $result."\n\n\n";

?>