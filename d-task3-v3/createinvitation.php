<?php

$status='';
$errors='';
if(isset($_POST['create']))
{
  session_start();
  $usr=$_SESSION['username'];
  $conn=mysqli_connect('localhost','shaun','test1234','task3');
  $event=$_POST['event'];
  $dt=$_POST['dt'];
  $ti=$_POST['ti'];
  $addnote=$_POST['addnote'];
  $header=$_POST['header'];
  $body=$_POST['body'];
  $footer=$_POST['footer'];
  $venue=$_POST['venue'];
  $hfc=$_POST['hfc'];
  $hbc=$_POST['hbc'];
  $bfc=$_POST['bfc'];
  $bbc=$_POST['bbc'];
  $ffc=$_POST['ffc'];
  $fbc=$_POST['fbc'];
  $deadline=$_POST['deadline'];
  $pri=$_POST['privateinvite'];
  $pos=$_POST['position'];
  //$image=$_FILES['image']['tmp_name'];
  //$img=addslashes(file_get_contents($image));
  $image = $_FILES['image']['name'];
  $target = "uploads/".basename($image);
  //print_r($img);
  //echo "$img";
  
  $sql="INSERT INTO events(username,event_name,dt,ti,add_note,header,body,footer,venue,hfc,hbc,bfc,bbc,ffc,fbc,private,imageid,position,deadline) VALUES('$usr','$event','$dt','$ti','$addnote','$header','$body','$footer','$venue','$hfc','$hbc','$bfc','$bbc','$ffc','$fbc','$pri','$image','$pos','$deadline')";

  if(mysqli_query($conn,$sql))
  {
    //echo "success";    
    if (move_uploaded_file($_FILES['image']['tmp_name'], $target))
    {
    $status='successfully created visit the dashboard to see the events that you have created';
    }
    //echo "success";
  }
  else
  {
    $status= "error".mysqli_error($conn);
    //echo mysqli_error($conn);
  }
  //echo "ok";
}


?>



<!DOCTYPE html>
<html>

<head>
	<title>INVITATION MAKER</title>
	<link rel="stylesheet" type="text/css" href="info3.css">

  <style type="text/css">
    
    input {
  margin: 5px;
  padding: 3px;
  font-size: 15px;
}

label {

  margin: 5px;
  padding: 3px;
  font-size: 20px;

}

.rows {

margin-top: 5vh;
margin-bottom: 5vh;
padding: 3vh; 
}

#create {
  font-size: 19px;
  border-radius: 8px;
  border-color: #ffa500;
  padding: 5px 15px 5px 15px;
    font-weight: 550;
    background-color: #000;
    color: #ffa500;
    border:0px;
}

#creatediv {
  display: flex;
  justify-content: center;
  margin-top: 5vh;

}
  
  </style>
</head>

<body>
     
     <div style="text-align: left; margin: 2vw; padding: 10px;">
        <button id="create"><a href="info3.php">Dashboard</a></button>
      </div>
     
     <div id="aa" style="margin:4vh;
  padding: 2vh; 
  display: flex;
  color: #ffa500;
  justify-content: center;">
     	
      <form action="createinvitation.php" method="POST" enctype="multipart/form-data">
      	
      <table>
      				  <tr class="rows">
      					<td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Event Type :</i>
      					</td>
      					<td class="tdl">
      					<!--<div style="display: flex; flex-direction: row; align-items: center;">
      					        <input type="radio" id="wedding" name="event" value="wedding">
                        <label for="wedding">Wedding</label><br>

                        <input type="radio" id="birthday" name="event" value="birthday">
                        <label for="birthday">Birthday</label><br>

                        <input type="radio" id="party" name="event" value="party">
                        <label for="party">Party</label><br>

                        <input type="radio" id="funeral" name="event" value="funeral">
                        <label for="funeral">Funeral</label><br>

                        <input type="radio" id="miscellaneou" name="event" value="miscellaneous">
                        <label for="miscellaneou">Miscellaneous</label><br>
                </div>-->
                <select id="event" name="event" style="display: flex; flex-direction: row; align-items: center; border-radius: 5px; border:2.5px solid #ffa500; font-size: 17px; color: #000;">
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="funeral">Funeral</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
                
                </td>
      				</tr>
              <tr>
             
              <div style="display: flex; justify-content: center;align-items: center;">
              <td><img src="images/wedding.jpg" style="width: 7vw;height: 19vh; "> Wedding</td>
              </div>

              <td><img src="images/birthday.jpg" style="width: 7vw;height: 19vh; "> Birthday</td>
              <td><img src="images/funeral.jpg" style="width: 7vw;height: 19vh; "> Funeral</td>
              </tr>
              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Date :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="date" id="date" name="dt" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>

              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Time :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="time" id="time" name="ti" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>

               <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Add Note :</i>
                </td>
                <td class="tdl" style="margin: 10px; padding: 5px;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <textarea id="textarea" rows="5" cols="50" name="addnote" style="border-radius: 5px; border:2.5px solid #ffa500;">If its a Miscellaneous event specify the what the event is and details of it...note that the info thats been written here would be placed in the event type in the invitation...if not leave this empty we have got templates for others.</textarea>
                </td>
              </tr>

               
               

              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Header font :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="color" id="hfc" name="hfc" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>



              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Header background :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="color" id="hbc" name="hbc" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>



               <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Header :</i>
                </td>
                <td class="tdl" style="margin: 10px; padding: 5px;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <textarea id="textarea" rows="5" cols="50" name="header" style="border-radius: 5px; border:2.5px solid #ffa500;"></textarea>
                </td>
              </tr>



              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Body font :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="color" id="bfc" name="bfc" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>



              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Body background :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="color" id="bbc" name="bbc" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>



              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Body :</i>
                </td>
                <td class="tdl" style="margin: 10px; padding: 5px;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <textarea id="textarea" rows="5" cols="50" name="body" style="border-radius: 5px; border:2.5px solid #ffa500;"></textarea>
                </td>
              </tr>



               <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Footer font :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="color" id="ffc" name="ffc" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>



              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Footer background :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="color" id="fbc" name="fbc" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>



              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Footer :</i>
                </td>
                <td class="tdl" style="margin: 10px; padding: 5px;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <textarea id="textarea" rows="5" cols="50" name="footer" style="border-radius: 5px; border:2.5px solid #ffa500;"></textarea>
                </td>
              </tr>


              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Venue :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="text" id="venue" name="venue" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>


               <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Private Invite :</i>
                </td>
                <td class="tdl" style="margin: 10px; padding: 5px;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <textarea id="textarea" rows="5" cols="50" name="privateinvite" style="border-radius: 5px; border:2.5px solid #ffa500;">if you want to make the invitation visible to only users you want remove this whole text and enter the comma separated usernames of users who you want to see or else if you dont want to give any private invites remove this whole text and leave this field empty </textarea>
                </td>
               </tr>

              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Image :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="file" id="image" name="image" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>


              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Image Position :</i>
                </td>
                <td class="tdl">
                <select id="position" name="position" style="display: flex; flex-direction: row; align-items: center; border-radius: 5px; border:2.5px solid #ffa500; font-size: 17px; color: #000;">
                  <option value="inheader">inheader</option>
                  <option value="inbody">inbody</option>
                  <option value="infooter">infooter</option>
                </select>
                
                </td>
              </tr>


              <tr class="rows">
                <td class="tdl" style="font-size: 25px; display: flex; align-items: center; margin: 10px; padding: 5px; background-color: #000; border-radius: 5px; justify-content: center;"><i>Deadline To Accept :</i>
                </td>
                <td class="tdl">
                <div style="display: flex; flex-direction: row; align-items: center;">
                        <input type="date" id="deadline" name="deadline" style="border-radius: 5px; border:2.5px solid #ffa500;">
                </td>
              </tr>
              
      				
       </table>
         <div id="creatediv">
            <div style="text-align: center;"></div>
                        <button id="create" name="create">Create</button>
         </div>
      <div style="text-align: center; color: #ff0000; font-size: 18px;"><p><?php echo "$status"; ?></p></div>
      </form>
     </div>
</body>

</html>