<?php
/**
 * Created by IntelliJ IDEA.
 * User: MarioTi
 * Date: 11-03-16
 * Time: 12:21
 */

if (!defined('BASEPATH')) exit('No direct script access allowed');

//$config['protocol'] = 'sendmail';
//$config['mailpath'] = '/usr/sbin/sendmail';
//$config['charset'] = 'iso-8859-1';
//$config['wordwrap'] = TRUE;

//$config['protocol'] = 'smtp';
//$config['smtp_host'] = 'fcab.cl.s9a1.psmtp.com';
//$config['smtp_user'] = 'infofcab@fcab.cl';
//$config['smtp_pass'] = '';
//$config['smtp_port'] = '25';
//
//$config['protocol'] = 'smtp';
//$config['smtp_host'] = 'pro.turbo-smtp.com';
//$config['smtp_user'] = 'mario.hidalgo@bibliotecasdibam.cl';
//$config['smtp_pass'] = 'HAR7hcuo';
//$config['smtp_port'] = '';
//

$config['protocol'] = "smtp";
$config['smtp_host'] = "smtp-relay.gmail.com";
$config['smtp_port'] = "25";
$config['smtp_user'] = "pedro.antonio.bros@gmail.com";
$config['smtp_pass'] = "";
$config['smtp_auth']   = FALSE;
$config['charset'] = "UTF-8";
$config['mailtype'] = "html";
$config['newline'] = "\r\n";

$config['wordwrap'] = TRUE;