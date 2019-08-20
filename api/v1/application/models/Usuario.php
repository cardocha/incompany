<?php

require_once(MODELS_DIR . 'BaseModel.php');

class Usuario extends BaseModel
{
    private static $TABELA = "usuario";

    function get_tabela(){
        return self::$TABELA;
    }

    public function login($login, $sen)
    {
        $this->db->select('id,login');
        $this->db->where('login', $login);
        $this->db->where('senha', strtoupper(md5($sen)));
        $query = $this->db->get(self::$TABELA);
        if ($query->num_rows() > 0) {
            return $query->result_array()[0]['id'];
        } else {
            return false;
        }
    }

}