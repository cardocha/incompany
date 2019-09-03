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

    public function set_todas_alternativas_incorretas($questao_id){
        $this->db->set('correta', FALSE);
        $this->db->where('questao_id', $questao_id);
        $this->db->update($this->get_tabela());
    }

    public function set_alternativa_correta($alternativa_id){
        $this->db->set('correta', TRUE);
        $this->db->where('id', $alternativa_id);
        $this->db->update($this->get_tabela());
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