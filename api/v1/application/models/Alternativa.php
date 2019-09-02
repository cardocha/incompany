<?php

require_once(MODELS_DIR . 'BaseModel.php');

class Alternativa extends BaseModel
{
    private static $TABELA = "alternativa";

    function get_tabela(){
        return self::$TABELA;
    }

    public function get_por_questao_id($questao_id){
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->where('questao_id', $questao_id);
        $this->db->order_by('ordem');
        $query = $this->db->get();
        return $query->result();
    }

    public function persistir($alternativa)
    {
        return  parent::persiste($alternativa, $this->get_tabela());
    }

    public function remover($alternativa)
    {
        return  parent::remove($alternativa['id'], 'id');
    }

}