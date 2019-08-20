<?php

if (!function_exists('carregar_dependencias')) {
    function carregar_dependencias()
    {
        $ci =& get_instance();
        $ci->load->model('usuario');
    }
}
