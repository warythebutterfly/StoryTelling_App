define("FS_ROOT", realpath(dirname(__FILE__)));
include_once FS_ROOT.'includes/config.php';
if(file_exists(FS_ROOT.$_SERVER['REQUEST_URI']){
    include(FS_ROOT.$_SERVER['REQUEST_URI']);
}else{
    // 404
}