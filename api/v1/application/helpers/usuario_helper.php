<?php

if (!function_exists('carregar_dependencias')) {
    function carregar_dependencias()
    {
        $ci =& get_instance();
        $ci->load->library('form_validation');
        $ci->load->model('usuario');
    }
}

if (!function_exists('valida_token')) {
     function valida_token($email, $token)
    {
         $ci =& get_instance();
         
         $usuario_recuperado = $ci->usuario->get_registro_por_email($email);
         $token_esperado = gerar_token($usuario_recuperado);
         return $token === $token_esperado;
    }
}

if (!function_exists('gerar_token')) {
    function gerar_token($usuario_recuperado){
        $token = null;
        $info_conexao = $_SERVER['HTTP_USER_AGENT'];
        if($usuario_recuperado)
            $token = hash('sha256', $usuario_recuperado['email'].$usuario_recuperado['senha'].$info_conexao);

        return $token;
    }
}


 
