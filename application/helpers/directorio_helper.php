<?php
/**
 * Created by Mario Hidalgo García
 */

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

function get_filenames_by_extension($source_dir, $extensions, $include_path = FALSE, $_recursion = TRUE)
        //Recursión en TRUE, no escanea las sub carpetas-
{
	static $_filedata = array();
			
	if ($fp = @opendir($source_dir))
	{
		if ($_recursion === FALSE)
		{
			$_filedata = array();
			$source_dir = rtrim(realpath($source_dir), DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;
		}
		
		while (FALSE !== ($file = readdir($fp)))
		{
			if (@is_dir($source_dir.$file) && strncmp($file, '.', 1) !== 0)
			{
				 get_filenames_by_extension($source_dir.$file.DIRECTORY_SEPARATOR, $extensions, $include_path, TRUE);
			}
			elseif (strncmp($file, '.', 1) !== 0)
			{
				if(in_array(pathinfo($file, PATHINFO_EXTENSION), $extensions))
				{
					$_filedata[] = ($include_path == TRUE) ? $source_dir.$file : $file;
				}					
			}
		}
		return $_filedata;
	}
	else
	{
		return FALSE;
	}
}